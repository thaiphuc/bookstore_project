import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthProvider";
const socket = io("http://localhost:5000");
    socket.on("connect", () => {
        console.log("Connected to WebSocket:", socket.id);
    });

    socket.on("connect_error", (err) => {
        console.error("WebSocket connection error:", err);
    });


const Game = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [birdPosition, setBirdPosition] = useState(50);
  const [flap, setFlap] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [scoredObstacles, setScoredObstacles] = useState([]);
  const navigate = useNavigate();

  const fetchPoints = async () => {
    try {
      const response = await axiosSecure.get("/game", {
        params: { userEmail: user.email },
      });
      setUserPoints(response.data.point);
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  const savePoints = async (points) => {
    try {
      await axiosSecure.post("/game/save", {
        userEmail: user.email,
        point: points,
      });
      fetchPoints(); 
    } catch (error) {
      console.error("Error saving points:", error);
    }
  };

  const generateObstacle = () => {
    return {
      id: Date.now(),
      left: 100,
      gapTop: Math.random() * 50 + 30,
    };
  };

  useEffect(() => {
    socket.on("flap", () => {
      setFlap(true);
      setTimeout(() => setFlap(false), 100);
    });

    return () => socket.off("flap");
  }, []);

  useEffect(() => {
    if (!isGameStarted) return; 

    let gravity = setInterval(() => {
      setBirdPosition((prev) => (prev < 100 ? prev + 0.75 : prev));
    }, 50);

    if (flap) setBirdPosition((prev) => (prev > 5 ? prev - 10 : prev));

    return () => clearInterval(gravity);
  }, [flap, isGameStarted]);

  useEffect(() => {
    if (!isGameStarted || gameOver) return;

    let obstacleTimer = setInterval(() => {
      setObstacles((prev) =>
        prev
          .map((obstacle) => ({
            ...obstacle,
            left: obstacle.left - 1,
          }))
          .filter((obstacle) => obstacle.left > -10)
      );
    }, 50);

    let generateTimer = setInterval(() => {
      setObstacles((prev) => [...prev, generateObstacle()]);
    }, 2000);

    return () => {
      clearInterval(obstacleTimer);
      clearInterval(generateTimer);
    };
  }, [gameOver, isGameStarted]);

  useEffect(() => {
    if (gameOver) return;
  
    const birdTop = birdPosition;
    const birdBottom = birdPosition + 5;
  
    obstacles.forEach((obstacle) => {
      const obstacleLeft = obstacle.left;
      const obstacleRight = obstacle.left + 10;
      const gapTop = obstacle.gapTop;
      const gapBottom = obstacle.gapTop + 20;
  
      // Kiểm tra va chạm
      if (
        obstacleLeft < 10 &&
        obstacleRight > 0 &&
        (birdTop < gapTop - 5 || birdBottom > gapBottom + 5)
      ) {
        setGameOver(true);
        savePoints(userPoints); 
      }

      if (obstacleLeft < 5 && !scoredObstacles.includes(obstacle.id)) {
        const newPoints = userPoints + 1;
        setUserPoints(newPoints); // Cập nhật điểm tích lũy
        setScoredObstacles((prev) => [...prev, obstacle.id]); 
        savePoints(newPoints); 
      }
    });
  }, [birdPosition, obstacles, gameOver, scoredObstacles]);
  

  const resetGame = () => {
    setBirdPosition(50);
    setObstacles([]);
    setScoredObstacles([]);
    setGameOver(false);
    setIsGameStarted(false);
    fetchPoints();
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  if (!isGameStarted) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#00d3b7",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Nhấn "Bắt đầu" để chơi!</h1>
        <button
          onClick={() => setIsGameStarted(true)}
          style={{
            padding: "10px 20px",
            fontSize: "20px",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: "green",
            color: "white",
            border: "none",
          }}
        >
          Bắt đầu
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 90px)",
        backgroundColor: "#00d3b7",
        overflow: "hidden",
        marginTop: "80px",
      }}
    >
      <div
        style={{
            position: "absolute", 
            top: "10px",
            left: "10px", 
            fontSize: "22px",
            fontWeight: "bold", 
            color: "white", 
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "10px", 
            borderRadius: "6px", 
            zIndex: 1000,
        }}
        >
        Điểm hiện tại: {userPoints}
        </div>
        <div
            style={{
                position: "absolute",
                left: "50px",
                top: `${birdPosition}%`,
                width: "4.5%",
                height: "auto",
            }}
            >
            <img
                src="/images/bird.png"
                alt="bird"
                style={{
                width: "150%",
                height: "150%",
                objectFit: "contain",
                }}
            />
            </div>
  
      {/* Chướng ngại vật */}
      {obstacles.map((obstacle) => (
        <div key={obstacle.id}>
          <div
            style={{
              position: "absolute",
              left: `${obstacle.left}%`,
              top: "0",
              width: "10%",
              height: `${obstacle.gapTop}%`,
              backgroundColor: "DarkGreen",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              left: `${obstacle.left}%`,
              top: `${obstacle.gapTop + 20}%`,
              width: "10%",
              height: `${100 - (obstacle.gapTop + 20)}%`,
              backgroundColor: "DarkGreen",
            }}
          ></div>
        </div>
      ))}
  
        <button
        onClick={() => socket.emit("flap")}
        style={{
            position: "absolute",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            fontSize: "20px",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: "white",
            border: "2px solid black", 
            color: "black",
            fontWeight: "bold",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
        }}
        >
        Bay
        </button>
  

      {gameOver && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: "bold", 
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Nền mờ
            color: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h1 style={{ marginBottom: "20px" }}>Kết thúc!</h1>
          <div>
          <button
            onClick={resetGame}
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: "red",
              color: "white",
              border: "none",
            }}
          >
            Chơi lại
          </button>
          {/* <button
            onClick={() => navigate("/reward-page")}
            style={{
              marginLeft:"10px",
              padding: "10px 20px",
              fontSize: "18px",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: "green",
              color: "white",
              border: "none",
            }}
          >
            Đổi thưởng
          </button> */}
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Game;
