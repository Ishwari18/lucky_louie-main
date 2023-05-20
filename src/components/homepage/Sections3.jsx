import JackPot from "../JackPot";
import SwapComponent from "../SwapComponent";

const styles = {
  section:
    "relative bg-[#000] md:flex flex-wrap md:flex-nowrap justify-between items-start md:px-20",
  mainContentContainer: "md:w-[40%] mt-6 mb-20 md:mb-0",
  h1: "text-[2em] mb-10 text-center md:text-left",
};

export default function Section3() {
  return (
    <section className={styles.section}>
      <div className={styles.mainContentContainer}>
        <h1 className={styles.h1}>Purchase Here:</h1>
        <SwapComponent />
      </div>
      <JackPot
        p={
          "If there are no purchases of $777 in the amount of $50 or more within an hour after your purchase, then the entirety of the hourly jackpot will automatically be credited to your wallet through our trustless smart contract."
        }
        title={"Hourly Jackpot"}
        time={"60:00 Mins Remaining"}
        second={true}
      />
    </section>
  );
}