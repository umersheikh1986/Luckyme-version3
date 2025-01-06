import GameCard from "./gameCard";

const GameCards = ({ userId, mode }: { userId: string; mode?: string }) => {
  return (
    <>
      <GameCard
        name="Golden Draw"
        mode={mode}
        Id={0}
        userId={userId}
        tAmount={"350"}
      />
      <GameCard
        name="Instant 1,000"
        mode={mode}
        Id={1}
        userId={userId}
        tAmount={"1,750"}
      />
      <GameCard
        name="Triple Power"
        mode={mode}
        Id={2}
        userId={userId}
        tAmount={"3,500"}
      />
      <GameCard
        name="Money Pot"
        mode={mode}
        Id={3}
        userId={userId}
        tAmount={"7,000"}
      />
      <GameCard
        name="Fantasy Wheel"
        Id={4}
        mode={mode}
        userId={userId}
        tAmount={"17,500"}
      />
      <GameCard
        name="Lucky Fireball"
        mode={mode}
        Id={5}
        userId={userId}
        tAmount={"35,000"}
      />
      <GameCard
        name="Jackpot Zone"
        mode={mode}
        Id={6}
        userId={userId}
        tAmount={"70,000"}
      />
      <GameCard
        name="Break The Bank"
        mode={mode}
        Id={7}
        userId={userId}
        tAmount={"175,000"}
      />
      <GameCard
        name="Mega Million"
        Id={8}
        mode={mode}
        userId={userId}
        tAmount={"700,000"}
      />
    </>
  );
};

export default GameCards;
