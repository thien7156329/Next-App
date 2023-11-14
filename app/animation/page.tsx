"use client";
import PermissionPage from "app/PermissionPage";
import "../../styles/animation.scss";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useEffectOnce } from "usehooks-ts";

interface IRobot {
  droidX: number;
  mouseX: number;
  toTheRight: boolean;
  speed: number;
  accelMod: number;
}

const AnimationPage = () => {
  // I've seen a few of these BB-8 animations about, so I thought I'd take a shot at building one using React as a bit of an exercise. My favorite thing to do is draw circles around him to make him do a little jig, but I'm easily amused.

  const [stateRobot, setStateRobot] = useState<IRobot>({
    droidX: 0,
    mouseX: 100,
    toTheRight: false,
    speed: 2,
    accelMod: 1,
  });

  const droidRef = useRef<number>(0);
  const stateClone = useRef<IRobot>(stateRobot);

  // Away we go.
  const { speed, accelMod, droidX, mouseX, toTheRight } = stateRobot;

  // Keep track of the mouse position.
  const handleMouseMove = (event: MouseEvent) => {
    const robotX = {
      ...stateClone.current,
      // droidX: event.pageX,
      mouseX: event.pageX,
    };
    setStateRobot((e) => ({
      ...e,
      // droidX: event.pageX,
    }));
    movement(robotX);
  };

  // Speed Mod Bar
  const handleSpeedChange = (e: any) => {
    if (parseFloat(e.target.value)) {
      setStateRobot({
        ...stateRobot,
        speed: parseFloat(e.target.value),
      });
    }
  };

  // Acceleration Mod Bar
  const handleAccelChange = (e: any) => {
    if (parseFloat(e.target.value)) {
      setStateRobot({
        ...stateRobot,
        accelMod: parseFloat(e.target.value),
      });
    }
  };

  useEffect(() => {
    stateClone.current = stateRobot;
  }, [stateRobot]);

  // Get moving!
  const movement = (stateRobotX: IRobot) => {
    let { droidX, mouseX, speed, accelMod } = stateRobotX;
    // Need a pretty strict if statement to make sure React doesn't end up in a
    // render loop with all the state changes / re-rendering going on.
    if (Math.abs(Math.round(droidX) - mouseX) !== 1) {
      let distance = mouseX - droidX;
      let acceleration = Math.abs(distance * accelMod) / 100;
      // Move to the right
      if (droidX < mouseX) {
        setStateRobot((rb) => ({
          ...rb,
          droidX: rb.droidX + speed * acceleration,
          toTheRight: true,
        }));
      }
      // Move to the left
      else {
        setStateRobot((rb) => ({
          ...rb,
          droidX: rb.droidX - speed * acceleration,
          toTheRight: false,
        }));
      }
      droidRef.current = droidX;
    }
  };

  // Get some initial movement on first mount.
  useEffectOnce(() => {
    setStateRobot({
      ...stateRobot,
      mouseX: 300,
    });
  });

  // Set up the mouse event listener and fire up the movement function.
  useEffectOnce(() => {
    document.addEventListener("mousemove", (e) => {
      handleMouseMove(e);
    });
    return () => {
      document.removeEventListener("mousemove", (e) => handleMouseMove(e));
    };
  });

  return (
    <PermissionPage>
      <div className="config">
        <div className="control-wrap">
          <p>Speed: {speed}</p>
          <input
            type="range"
            min="0"
            max="11"
            step="0.1"
            value={speed}
            onChange={(e) => handleSpeedChange(e)}
          />
        </div>
        <div className="control-wrap">
          <p>Acceleration: {accelMod}</p>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={accelMod}
            onChange={(e) => handleAccelChange(e)}
          />
        </div>
      </div>

      <div
        className="bb8"
        style={{ WebkitTransform: `translateX(${droidX}px)` }}
      >
        <div
          className={"antennas " + (toTheRight ? "right" : "")}
          style={{
            WebkitTransform: `translateX(${(mouseX - droidX) / 25}px) rotateZ(${
              (mouseX - droidX) / 80
            }deg)`,
          }}
        >
          <div className="antenna short"></div>
          <div className="antenna long"></div>
        </div>
        <div
          className="head"
          style={{
            WebkitTransform: `translateX(${(mouseX - droidX) / 15}px) rotateZ(${
              (mouseX - droidX) / 25
            }deg)`,
          }}
        >
          <div className="stripe one"></div>
          <div className="stripe two"></div>
          <div className={"eyes " + (toTheRight ? "right" : "")}>
            <div className="eye one"></div>
            <div className="eye two"></div>
          </div>
          <div className={"stripe detail " + (toTheRight ? "right" : "")}>
            <div className="detail zero"></div>
            <div className="detail zero"></div>
            <div className="detail one"></div>
            <div className="detail two"></div>
            <div className="detail three"></div>
            <div className="detail four"></div>
            <div className="detail five"></div>
            <div className="detail five"></div>
          </div>
          <div className="stripe three"></div>
        </div>
        <div
          className="ball"
          style={{ WebkitTransform: `rotateZ(${droidX / 2}deg)` }}
        >
          <div className="lines one"></div>
          <div className="lines two"></div>
          <div className="ring one"></div>
          <div className="ring two"></div>
          <div className="ring three"></div>
        </div>
        <div className="shadow"></div>
      </div>

      <div className="instructions">
        <p>move your mouse.</p>
      </div>
    </PermissionPage>
  );
};

export default AnimationPage;
