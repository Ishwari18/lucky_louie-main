/* eslint-disable react/prop-types */
import JackPotImg from "../assets/jackpot.png";
import JackPotImg2 from "../assets/jackpot2.png";

export default function JackPot({ p, time, title, second }) {
  const styles = {
    jackpot: "relative md:mb-60 mb-[300px]",
    jackpotImg: `${second ? "md:h-[550px]" : "md:h-[450px]"} ${
      !second && "h-[295px]"
    } w-auto
    }`,
    h1: "text-[2.5em] text-center mb-7 parisienne",
    mainContent:
      "flex flex-col flex-wrap md:flex-nowrap justify-center items-center w-full py-5 absolute bottom-[-250px] md:bottom-[-200px] gap-2 rounded-3xl bg-[#3232328F]",
    morphism:
      "bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5",
    p: "text-[0.8em] mx-auto w-[81%] text-center",
    green: "text-[color:var(--light-green)] underline",
    h2: "text-[2.2em] font-bold",
    h3: "text-[1.7em] font-bold",
    blue: "text-[#6BD3FA] font-bold text-[1]",
  };
  return (
    <div className={styles.jackpot}>
      <h1 className={styles.h1}>{title}</h1>
      <img
        className={styles.jackpotImg}
        src={second ? JackPotImg2 : JackPotImg}
        alt=""
      />
      <div className={styles.mainContent}>
        <h3 className={styles.h3}>Jackpot</h3>
        {time && <p className={styles.p + " " + styles.blue}>{time}</p>}
        <h2
          className={styles.h2}
          style={{
            background:
              "linear-gradient(90deg, #B24FAB 2.41%, #D85388 106.17%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          8,403 ETH
        </h2>
        <p className={styles.p}>
          {p}
          {/* This is guaranteed by a{" "}
          <span className={styles.green}>smart contract</span>. */}
        </p>
        <p className={`${styles.p} ${styles.green}`}>
          Last wallet Address: <br /> 0x0000.0000
        </p>
      </div>
    </div>
  );
}
