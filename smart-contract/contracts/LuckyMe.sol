// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IRandomNumberGenerator.sol";

contract LuckyMe is Ownable {
  using Counters for Counters.Counter;
  using SafeERC20 for IERC20;
  IRandomNumberGenerator public Number;
  IERC20 public DAI;

  /**
      User Data
   */
  struct userGame {
    uint8 Game;
    uint8 Prize;
    uint256 GameId;
    uint8 LuckyNumber;
  }
  struct pick {
    uint8 Game;
    uint256 GameId;
    uint8 Number;
  }
  struct user {
    uint8 Plan;
    uint256 Id;
    uint256 Ref;
    address Address;
    /**

     */
    uint256[] AllRef;
    /**

     */
    uint256 registerAt;
    uint256 TimeToRenew;
    /**

     */
    uint256 TotalPrizesAmount;
    uint256 TotalPicksRewards;
    uint256 TotalPrizesRewards;
    uint256 TotalReferralRewards;
    /**
     * @notice
     */
    pick[] Picks;
    userGame[] AllWinLuckyDraw;
  }
  uint32 public Year = 365 days;
  Counters.Counter public UsersIds;
  mapping(uint256 => user) public User;
  mapping(address => uint256) public UserId;
  mapping(address => bool) public isUserExists;
  mapping(uint8 => mapping(uint256 => uint256)) public MembersRefByLevel;
  mapping(uint8 => mapping(uint256 => uint256)) public PartnersRefByLevel;

  /**
      Membership plans
   */
  struct totalRewardsPaid {
    uint256 Prize;
    uint256 PicksRef;
    uint256 PrizesRef;
    uint256 MemberRef;
  }
  totalRewardsPaid public TotalRewardsPaid;

  /**
      Membership plans
   */
  uint8 public Plans;
  uint256 public Members;
  uint256 public Partners;
  mapping(uint8 => uint256) public MembershipPlan;

  /**
      lucky draws ( Game )
   */
  uint8 public TotalGames;
  uint8 public TotalParticipates;
  mapping(uint8 => uint256) public GameEntryFee;

  /**
      lucky draws ( Game ) user data
   */
  struct game {
    uint256 StartedAt;
    uint256 EndedAt;
    bool GameOver;
    /**
     *
     */
    bool Withdraw;
    uint8[] Winners;
    uint256[] WinnersId;
    /**
     * @notice
     */
    uint8[] AllNumbers;
    uint256[100] AllParticipates;
    /**
     * @notice
     */
    uint256 TotalPrizeAmount;
    /**
     * @notice
     */
    mapping(uint8 => bool) Sold;
    mapping(uint8 => uint256) UserId;
  }
  struct compGame {
    uint8 Game;
    uint256 GameId;
  }
  compGame[] compGames;
  uint256 public TotalPicksAmount;
  Counters.Counter public TotalPicks;
  mapping(uint8 => Counters.Counter) public GameIds;
  mapping(uint8 => mapping(uint256 => game)) internal Game;
  mapping(uint8 => mapping(uint256 => mapping(uint256 => bool)))
    internal UserInGame;

  /**
      Membership Referrals
   */
  uint8 public TotalPrizes;
  mapping(uint8 => uint8) public Prizes;

  /**
      Membership Referrals
   */
  uint8 public RefLevels;
  mapping(uint8 => uint8) public MembershipRefLevels;

  /**
      Purchase Referrals
   */
  uint8 public PurLevels;
  mapping(uint8 => uint8) public PurchaseRefLevels;

  /**
      Prize Referrals
   */
  uint8 public PriLevels;
  mapping(uint8 => mapping(uint8 => mapping(uint8 => uint256)))
    public PrizeRefLevels;

  /********************************************************
                        Constructor
  ********************************************************/

  constructor(address _DAI, address _RandomNumberGenerator) {
    DAI = IERC20(_DAI);
    Number = IRandomNumberGenerator(_RandomNumberGenerator);

    /**
      Registering user
    */
    uint256 _id = UsersIds.current();
    User[_id].Id = _id;
    User[_id].Ref = _id;
    User[_id].Plan = 1;
    User[_id].Address = owner();
    UserId[owner()] = _id;
    isUserExists[owner()] = true;
    User[_id].registerAt = block.timestamp;

    /**
        Membership plans
     */
    Plans = 1;
    MembershipPlan[0] = 1 ether;
    MembershipPlan[1] = 10 ether;

    /**
        Lucky draws ( Game )
     */
    TotalGames = 9;
    TotalParticipates = 100;
    GameEntryFee[0] = 5 ether;
    GameEntryFee[1] = 25 ether;
    GameEntryFee[2] = 50 ether;
    GameEntryFee[3] = 100 ether;
    GameEntryFee[4] = 250 ether;
    GameEntryFee[5] = 500 ether;
    GameEntryFee[6] = 1000 ether;
    GameEntryFee[7] = 2500 ether;
    GameEntryFee[8] = 10000 ether;

    /**
     * game start time
     */
    Game[0][0].StartedAt = block.timestamp;
    Game[1][0].StartedAt = block.timestamp;
    Game[2][0].StartedAt = block.timestamp;
    Game[3][0].StartedAt = block.timestamp;
    Game[4][0].StartedAt = block.timestamp;
    Game[5][0].StartedAt = block.timestamp;
    Game[6][0].StartedAt = block.timestamp;
    Game[7][0].StartedAt = block.timestamp;
    Game[8][0].StartedAt = block.timestamp;

    /**
        Membership Referrals
     */
    RefLevels = 5;
    MembershipRefLevels[0] = 25;
    MembershipRefLevels[1] = 10;
    MembershipRefLevels[2] = 5;
    MembershipRefLevels[3] = 5;
    MembershipRefLevels[4] = 5;
    //               Total = 50%

    /**
        Purchase Referrals
     */
    PurLevels = 5;
    PurchaseRefLevels[0] = 8;
    PurchaseRefLevels[1] = 3;
    PurchaseRefLevels[2] = 2;
    PurchaseRefLevels[3] = 1;
    PurchaseRefLevels[4] = 1;
    //             Total = 15%

    /**
        Prizes
     */
    TotalPrizes = 3;
    Prizes[0] = 40;
    Prizes[1] = 20;
    Prizes[2] = 10;
    //  Total = 70%

    /**
        Prize Referrals Game 1
     */
    PriLevels = 5;
    PrizeRefLevels[0][0][0] = 22.85 ether;
    PrizeRefLevels[0][0][1] = 8.55 ether;
    PrizeRefLevels[0][0][2] = 5.7 ether;
    PrizeRefLevels[0][0][3] = 2.85 ether;
    PrizeRefLevels[0][0][4] = 2.85 ether;
    //             Total = 42.8 ether

    PrizeRefLevels[0][1][0] = 11.4 ether;
    PrizeRefLevels[0][1][1] = 4.3 ether;
    PrizeRefLevels[0][1][2] = 2.85 ether;
    PrizeRefLevels[0][1][3] = 1.45 ether;
    PrizeRefLevels[0][1][4] = 1.45 ether;
    //             Total = 21.45 ether

    PrizeRefLevels[0][2][0] = 5.7 ether;
    PrizeRefLevels[0][2][1] = 2.15 ether;
    PrizeRefLevels[0][2][2] = 1.4 ether;
    PrizeRefLevels[0][2][3] = 0.75 ether;
    PrizeRefLevels[0][2][4] = 0.75 ether;
    //             Total = 10.75 ether

    /**
        Prize Referrals Game 2
     */
    PriLevels = 5;
    PrizeRefLevels[1][0][0] = 114.3 ether;
    PrizeRefLevels[1][0][1] = 42.85 ether;
    PrizeRefLevels[1][0][2] = 28.55 ether;
    PrizeRefLevels[1][0][3] = 14.3 ether;
    PrizeRefLevels[1][0][4] = 14.3 ether;
    //                Total = 214.3 ether

    PrizeRefLevels[1][1][0] = 57.15 ether;
    PrizeRefLevels[1][1][1] = 21.4 ether;
    PrizeRefLevels[1][1][2] = 14.3 ether;
    PrizeRefLevels[1][1][3] = 7.15 ether;
    PrizeRefLevels[1][1][4] = 7.15 ether;
    //                Total = 107.15 ether

    PrizeRefLevels[1][2][0] = 28.55 ether;
    PrizeRefLevels[1][2][1] = 10.7 ether;
    PrizeRefLevels[1][2][2] = 7.2 ether;
    PrizeRefLevels[1][2][3] = 3.55 ether;
    PrizeRefLevels[1][2][4] = 3.55 ether;
    //                Total = 53.55 ether

    /**
        Prize Referrals Game 3
     */
    PriLevels = 5;
    PrizeRefLevels[2][0][0] = 228.56 ether;
    PrizeRefLevels[2][0][1] = 85.71 ether;
    PrizeRefLevels[2][0][2] = 57.15 ether;
    PrizeRefLevels[2][0][3] = 28.57 ether;
    PrizeRefLevels[2][0][4] = 28.57 ether;
    //                Total = 428.560 ether

    PrizeRefLevels[2][1][0] = 114.28 ether;
    PrizeRefLevels[2][1][1] = 42.86 ether;
    PrizeRefLevels[2][1][2] = 28.57 ether;
    PrizeRefLevels[2][1][3] = 14.29 ether;
    PrizeRefLevels[2][1][4] = 14.29 ether;
    //                Total = 214.290 ether

    PrizeRefLevels[2][2][0] = 57.15 ether;
    PrizeRefLevels[2][2][1] = 21.43 ether;
    PrizeRefLevels[2][2][2] = 14.29 ether;
    PrizeRefLevels[2][2][3] = 7.14 ether;
    PrizeRefLevels[2][2][4] = 7.14 ether;
    //                Total = 107.150 ether

    /**
        Prize Referrals Game 4
     */
    PriLevels = 5;
    PrizeRefLevels[3][0][0] = 457.15 ether;
    PrizeRefLevels[3][0][1] = 171.4 ether;
    PrizeRefLevels[3][0][2] = 114.3 ether;
    PrizeRefLevels[3][0][3] = 57.15 ether;
    PrizeRefLevels[3][0][4] = 57.15 ether;
    //                Total = 857.15 ether

    PrizeRefLevels[3][1][0] = 228.55 ether;
    PrizeRefLevels[3][1][1] = 85.7 ether;
    PrizeRefLevels[3][1][2] = 57.15 ether;
    PrizeRefLevels[3][1][3] = 28.55 ether;
    PrizeRefLevels[3][1][4] = 28.55 ether;
    //                Total = 428.5 ether

    PrizeRefLevels[3][2][1] = 42.85 ether;
    PrizeRefLevels[3][2][0] = 114.3 ether;
    PrizeRefLevels[3][2][2] = 28.6 ether;
    PrizeRefLevels[3][2][3] = 14.3 ether;
    PrizeRefLevels[3][2][4] = 14.3 ether;
    //                Total = 214.35 ether

    /**
        Prize Referrals Game 5
     */
    PriLevels = 5;
    PrizeRefLevels[4][0][0] = 1142.85 ether;
    PrizeRefLevels[4][0][1] = 428.55 ether;
    PrizeRefLevels[4][0][2] = 285.7 ether;
    PrizeRefLevels[4][0][3] = 142.85 ether;
    PrizeRefLevels[4][0][4] = 142.85 ether;
    //                Total = 2,142.800 ether

    PrizeRefLevels[4][1][0] = 571.4 ether;
    PrizeRefLevels[4][1][1] = 214.3 ether;
    PrizeRefLevels[4][1][2] = 142.85 ether;
    PrizeRefLevels[4][1][3] = 71.45 ether;
    PrizeRefLevels[4][1][4] = 71.45 ether;
    //                Total = 1,071.450 ether

    PrizeRefLevels[4][2][0] = 285.7 ether;
    PrizeRefLevels[4][2][1] = 107.15 ether;
    PrizeRefLevels[4][2][2] = 71.4 ether;
    PrizeRefLevels[4][2][3] = 35.75 ether;
    PrizeRefLevels[4][2][4] = 35.75 ether;
    //                Total = 535.750 ether

    /**
        Prize Referrals Game 6
     */
    PriLevels = 5;
    PrizeRefLevels[5][0][0] = 2285.7 ether;
    PrizeRefLevels[5][0][1] = 857.15 ether;
    PrizeRefLevels[5][0][2] = 571.4 ether;
    PrizeRefLevels[5][0][3] = 285.7 ether;
    PrizeRefLevels[5][0][4] = 285.7 ether;
    //                Total = 4,285.650 ether

    PrizeRefLevels[5][1][0] = 1142.85 ether;
    PrizeRefLevels[5][1][1] = 428.55 ether;
    PrizeRefLevels[5][1][2] = 285.7 ether;
    PrizeRefLevels[5][1][3] = 142.85 ether;
    PrizeRefLevels[5][1][4] = 142.85 ether;
    //                Total = 2,142.800 ether

    PrizeRefLevels[5][2][0] = 571.4 ether;
    PrizeRefLevels[5][2][1] = 214.35 ether;
    PrizeRefLevels[5][2][2] = 142.9 ether;
    PrizeRefLevels[5][2][3] = 71.45 ether;
    PrizeRefLevels[5][2][4] = 71.45 ether;
    //                Total = 1,071.550 ether

    /**
        Prize Referrals Game 7
     */
    PriLevels = 5;
    PrizeRefLevels[6][0][0] = 4571.4 ether;
    PrizeRefLevels[6][0][1] = 1714.3 ether;
    PrizeRefLevels[6][0][2] = 1142.85 ether;
    PrizeRefLevels[6][0][3] = 571.4 ether;
    PrizeRefLevels[6][0][4] = 571.4 ether;
    //                Total = 8,571.350 ether

    PrizeRefLevels[6][1][0] = 2285.7 ether;
    PrizeRefLevels[6][1][1] = 857.15 ether;
    PrizeRefLevels[6][1][2] = 571.4 ether;
    PrizeRefLevels[6][1][3] = 285.7 ether;
    PrizeRefLevels[6][1][4] = 285.7 ether;
    //                Total = 4,285.650 ether

    PrizeRefLevels[6][2][0] = 1142.85 ether;
    PrizeRefLevels[6][2][1] = 428.6 ether;
    PrizeRefLevels[6][2][2] = 285.75 ether;
    PrizeRefLevels[6][2][3] = 142.9 ether;
    PrizeRefLevels[6][2][4] = 142.9 ether;
    //                Total = 2,143.000 ether

    /**
        Prize Referrals Game 8
     */
    PriLevels = 5;
    PrizeRefLevels[7][0][0] = 11428.57 ether;
    PrizeRefLevels[7][0][1] = 4285.71 ether;
    PrizeRefLevels[7][0][2] = 2857.14 ether;
    PrizeRefLevels[7][0][3] = 1428.57 ether;
    PrizeRefLevels[7][0][4] = 1428.57 ether;
    //                Total = 85,714.250 ether

    PrizeRefLevels[7][1][0] = 5714.29 ether;
    PrizeRefLevels[7][1][1] = 2142.86 ether;
    PrizeRefLevels[7][1][2] = 1428.57 ether;
    PrizeRefLevels[7][1][3] = 714.29 ether;
    PrizeRefLevels[7][1][4] = 714.29 ether;
    //                Total = 42,857.150 ether

    PrizeRefLevels[7][2][0] = 2857.14 ether;
    PrizeRefLevels[7][2][1] = 1071.43 ether;
    PrizeRefLevels[7][2][2] = 714.29 ether;
    PrizeRefLevels[7][2][3] = 357.14 ether;
    PrizeRefLevels[7][2][4] = 357.14 ether;
    //                Total = 21,428.600 ether

    /**
        Prize Referrals Game 9
     */
    PriLevels = 5;
    PrizeRefLevels[8][0][0] = 45714.25 ether;
    PrizeRefLevels[8][0][1] = 17142.85 ether;
    PrizeRefLevels[8][0][2] = 11428.55 ether;
    PrizeRefLevels[8][0][3] = 5714.3 ether;
    PrizeRefLevels[8][0][4] = 5714.3 ether;
    //                Total = 85,714.250 ether

    PrizeRefLevels[8][1][0] = 22857.15 ether;
    PrizeRefLevels[8][1][1] = 8571.4 ether;
    PrizeRefLevels[8][1][2] = 5714.3 ether;
    PrizeRefLevels[8][1][3] = 2857.15 ether;
    PrizeRefLevels[8][1][4] = 2857.15 ether;
    //                Total = 42,857.150 ether

    PrizeRefLevels[8][2][0] = 11428.55 ether;
    PrizeRefLevels[8][2][1] = 4285.7 ether;
    PrizeRefLevels[8][2][2] = 2857.15 ether;
    PrizeRefLevels[8][2][3] = 1428.6 ether;
    PrizeRefLevels[8][2][4] = 1428.6 ether;
    //                Total = 21,428.600 ether
  }

  /********************************************************
                        Modifier
  ********************************************************/

  bool internal Locked;
  modifier noReentrant() {
    require(!Locked, "No re-entrancy");
    Locked = true;
    _;
    Locked = false;
  }

  /********************************************************
                        Public Functions
  ********************************************************/

  function register(
    uint256 _ref,
    uint8 _plan,
    address _user
  ) public noReentrant {
    require(Plans >= _plan, "Please choose correct plan");
    require(!isUserExists[_user], "User exists");
    require(isUserExists[User[_ref].Address], "Ref not exists");

    uint256 _amount = MembershipPlan[_plan];
    DAI.safeTransferFrom(msg.sender, address(this), _amount);

    UsersIds.increment();
    uint256 _id = UsersIds.current();

    User[_id].Id = _id;
    User[_id].Ref = _ref;
    User[_id].Plan = _plan;
    User[_id].Address = _user;
    User[_id].TimeToRenew = block.timestamp + Year;
    User[_id].registerAt = block.timestamp;
    UserId[_user] = _id;
    isUserExists[_user] = true;

    User[_ref].AllRef.push(_id);

    if (_plan == 0) Members++;
    if (_plan == 1) Partners++;

    registerRefByLevel(_plan, _ref);
    registerUplineMemberRef(_id, _ref, _amount);

    emit _registered(_id, _ref, _plan, _user, block.timestamp);
  }

  function renew(uint256 _id) public noReentrant {
    user memory _user = User[_id];
    require(isUserExists[_user.Address], "User not exists");

    uint256 _amount = MembershipPlan[_user.Plan];
    DAI.safeTransferFrom(msg.sender, address(this), _amount);

    User[_id].TimeToRenew = block.timestamp + Year;
    renewUplineMemberRef(_id, _user.Ref, _amount);

    emit _renewed(_id, _user.Ref, _user.Plan, _user.Address, block.timestamp);
  }

  function upgradePlan(uint256 _id) public noReentrant {
    user memory _user = User[_id];

    require(isUserExists[_user.Address], "User not exists");
    require(_user.Plan == 0, "Already upgraded");

    uint256 _amount = MembershipPlan[1];
    DAI.safeTransferFrom(msg.sender, address(this), _amount);

    Members--;
    Partners++;
    User[_id].Plan = 1;
    User[_id].TimeToRenew = block.timestamp + Year;

    upgradeRefByLevel(_user.Ref);
    upgradePlanUplineMemberRef(_id, _user.Ref, _amount);

    emit _upgraded(_id, _user.Ref, _user.Plan, _user.Address, block.timestamp);
  }

  function enterGame(
    uint8 _game,
    uint8 _number,
    uint256 _id
  ) public noReentrant {
    require(TotalGames > _game, "Please choose correct game");
    require(TotalParticipates > _number, "Number is not correct");

    user memory _user = User[_id];
    require(isUserExists[_user.Address], "User not exists");
    require(
      _user.TimeToRenew > block.timestamp || _id == 0,
      "It's Time To Renew"
    );

    uint256 _gameId = GameIds[_game].current();
    require(!Game[_game][_gameId].Sold[_number], "This number is already sell");

    uint256 _amount = GameEntryFee[_game];
    DAI.safeTransferFrom(msg.sender, address(this), _amount);

    game storage _Game = Game[_game][_gameId];
    require(!_Game.GameOver, "Game Over");

    _Game.Sold[_number] = true;
    _Game.UserId[_number] = _id;
    _Game.AllParticipates[_number] = _id;
    _Game.AllNumbers.push(_number);

    if (_Game.StartedAt == 0) _Game.StartedAt = block.timestamp;

    TotalPicks.increment();
    TotalPicksAmount += _amount;
    UserInGame[_game][_gameId][_id] = true;
    User[_id].Picks.push(pick(_game, _gameId, _number));

    uplinePicksRef(_id, _game, _user.Ref, _amount);
    _Game.TotalPrizeAmount += Percentage(_amount, 85);

    emit _picked(
      _id,
      _user.Ref,
      _user.Plan,
      _game,
      _gameId,
      _amount,
      block.timestamp
    );

    if (_Game.AllNumbers.length == TotalParticipates) {
      for (uint8 i = 0; i < TotalPrizes; i++) {
        uint8 _luckyNumber = Number.randomNumberGenerator(i) % 99;

        _Game.Winners.push(_luckyNumber);
        _Game.WinnersId.push(_Game.AllParticipates[_luckyNumber]);

        User[_Game.AllParticipates[_luckyNumber]].AllWinLuckyDraw.push(
          userGame(_game, i, _gameId, _luckyNumber)
        );
      }

      emit _winnersAnnounced(_game, _gameId, _Game.Winners, block.timestamp);

      _Game.GameOver = true;
      _Game.EndedAt = block.timestamp;

      compGames.push(compGame(_game, _gameId));
      GameIds[_game].increment();
    }
  }

  function withdrawPrizes(uint8 _game, uint256 _gameId) public noReentrant {
    require(Game[_game][_gameId].GameOver, "Game hasn't ended yet");
    require(!Game[_game][_gameId].Withdraw, "Prizes already withdrawn");

    uint256 _amount = GameEntryFee[_game] * 100;
    game storage _Game = Game[_game][_gameId];

    for (uint8 i = 0; i < 3; i++) {
      user memory _User = User[_Game.WinnersId[i]];
      uint256 _Percentage = Percentage(_amount, Prizes[i]);

      DAI.safeTransfer(_User.Address, _Percentage);

      User[_Game.WinnersId[i]].TotalPrizesAmount += _Percentage;
      TotalRewardsPaid.Prize += _Percentage;
      uplinePrizesRef(_User.Id, _User.Ref, _game, _gameId, i);

      emit _prizesWinner(
        _User.Id,
        _User.Ref,
        _User.Plan,
        _User.Address,
        _game,
        _gameId,
        i,
        _Percentage,
        block.timestamp
      );
    }

    _Game.Withdraw = true;
    emit _prizesWithdraw(_game, _gameId, _amount, block.timestamp);
  }

  /********************************************************
                        private Functions
  ********************************************************/

  function registerRefByLevel(uint8 _plan, uint256 _ref) private {
    for (uint8 j = 0; j < RefLevels; j++) {
      if (_plan == 0) MembersRefByLevel[j][_ref] += 1;
      if (_plan == 1) PartnersRefByLevel[j][_ref] += 1;

      _ref = User[_ref].Ref;
    }
  }

  function registerUplineMemberRef(
    uint256 _id,
    uint256 _ref,
    uint256 _amount
  ) private {
    uint8 j;
    while (j < RefLevels) {
      user memory _user = User[_ref];

      if (
        (_user.Plan == 1 && _user.TimeToRenew > block.timestamp) || _ref == 0
      ) {
        uint256 _Percentage = Percentage(_amount, MembershipRefLevels[j]);

        DAI.safeTransfer(_user.Address, _Percentage);

        TotalRewardsPaid.MemberRef += _Percentage;
        User[_ref].TotalReferralRewards += _Percentage;

        emit _uplineMemberRef(
          _id,
          _user.Id,
          User[_id].Plan,
          User[_id].Address,
          _Percentage,
          block.timestamp
        );

        j++;
      }

      _ref = _user.Ref;
    }

    DAI.safeTransfer(owner(), Percentage(_amount, 50));
  }

  function upgradeRefByLevel(uint256 _ref) private {
    for (uint8 j = 0; j < RefLevels; j++) {
      MembersRefByLevel[j][_ref] -= 1;
      PartnersRefByLevel[j][_ref] += 1;

      _ref = User[_ref].Ref;
    }
  }

  function upgradePlanUplineMemberRef(
    uint256 _id,
    uint256 _ref,
    uint256 _amount
  ) private {
    uint8 j;
    while (j < RefLevels) {
      user memory _user = User[_ref];
      if (
        (_user.Plan == 1 && _user.TimeToRenew > block.timestamp) || _ref == 0
      ) {
        uint256 _Percentage = Percentage(_amount, MembershipRefLevels[j]);

        DAI.safeTransfer(_user.Address, _Percentage);

        TotalRewardsPaid.MemberRef += _Percentage;
        User[_ref].TotalReferralRewards += _Percentage;

        emit _uplineMemberRef(
          _id,
          _user.Id,
          User[_id].Plan,
          User[_id].Address,
          _Percentage,
          block.timestamp
        );

        j++;
      }

      _ref = _user.Ref;
    }

    DAI.safeTransfer(owner(), Percentage(_amount, 50));
  }

  function renewUplineMemberRef(
    uint256 _id,
    uint256 _ref,
    uint256 _amount
  ) private {
    uint8 j;
    while (j < RefLevels) {
      user memory _user = User[_ref];
      if (
        (_user.Plan == 1 && _user.TimeToRenew > block.timestamp) || _ref == 0
      ) {
        uint256 _Percentage = Percentage(_amount, MembershipRefLevels[j]);

        DAI.safeTransfer(_user.Address, _Percentage);

        TotalRewardsPaid.MemberRef += _Percentage;
        User[_ref].TotalReferralRewards += _Percentage;

        emit _uplineMemberRef(
          _id,
          _user.Id,
          User[_id].Plan,
          User[_id].Address,
          _Percentage,
          block.timestamp
        );

        j++;
      }
      _ref = _user.Ref;
    }

    DAI.safeTransfer(owner(), Percentage(_amount, 50));
  }

  function uplinePicksRef(
    uint256 _id,
    uint8 _game,
    uint256 _ref,
    uint256 _amount
  ) private {
    uint8 j;
    while (j < PurLevels) {
      user memory _user = User[_ref];

      if (
        (_user.Plan == 1 && _user.TimeToRenew > block.timestamp) || _ref == 0
      ) {
        uint256 _Percentage = Percentage(_amount, PurchaseRefLevels[j]);

        DAI.safeTransfer(_user.Address, _Percentage);

        TotalRewardsPaid.PicksRef += _Percentage;
        User[_ref].TotalPicksRewards += _Percentage;

        emit _uplinePicksRef(
          _id,
          _user.Id,
          User[_id].Plan,
          User[_id].Address,
          _game,
          _Percentage,
          block.timestamp
        );

        j++;
      }
      _ref = _user.Ref;
    }
  }

  function uplinePrizesRef(
    uint256 _Id,
    uint256 _ref,
    uint8 _game,
    uint256 _gameId,
    uint8 _i
  ) private {
    uint8 j;
    while (j < PriLevels) {
      user memory _user = User[_ref];

      if (
        (_user.Plan == 1 && _user.TimeToRenew > block.timestamp) || _ref == 0
      ) {
        uint256 _amount = PrizeRefLevels[_game][_i][j];
        DAI.safeTransfer(_user.Address, _amount);

        TotalRewardsPaid.PrizesRef += _amount;
        User[_ref].TotalPrizesRewards += _amount;

        emit _uplinePrizesRef(
          _Id,
          _user.Id,
          User[_Id].Plan,
          User[_Id].Address,
          _i,
          _game,
          _gameId,
          _amount,
          block.timestamp
        );

        j++;
      }
      _ref = _user.Ref;
    }
  }

  /********************************************************
                        Reusable Functions
  ********************************************************/

  function Percentage(uint256 a, uint8 n) internal pure returns (uint256) {
    // a = amount , n = number, p = percentage

    uint256 p = a * 1e18;
    p = (p * n) / 100;
    p = p / 1e18;

    return p;
  }

  /********************************************************
                        View Functions
  ********************************************************/

  struct gameDetail {
    uint256 Id;
    uint256 StartedAt;
    uint256 EndedAt;
    bool GameOver;
    bool Withdraw;
    uint256 EntryFee;
    uint8[] Winners;
    uint256[] WinnersId;
    uint8[] AllNumbers;
    uint256[100] AllParticipates;
    uint256 TotalPrizeAmount;
  }

  function singleGameDetail(
    uint8 _game,
    uint8 _gameId
  ) public view returns (gameDetail memory) {
    game storage _Game = Game[_game][_gameId];

    return
      gameDetail(
        _gameId,
        _Game.StartedAt,
        _Game.EndedAt,
        _Game.GameOver,
        _Game.Withdraw,
        GameEntryFee[_game],
        _Game.Winners,
        _Game.WinnersId,
        _Game.AllNumbers,
        _Game.AllParticipates,
        _Game.TotalPrizeAmount
      );
  }

  function currentGameDetail(
    uint8 _game
  ) public view returns (gameDetail memory) {
    uint256 _GameId = GameIds[_game].current();
    game storage _Game = Game[_game][_GameId];

    return
      gameDetail(
        _GameId,
        _Game.StartedAt,
        _Game.EndedAt,
        _Game.GameOver,
        _Game.Withdraw,
        GameEntryFee[_game],
        _Game.Winners,
        _Game.WinnersId,
        _Game.AllNumbers,
        _Game.AllParticipates,
        _Game.TotalPrizeAmount
      );
  }

  function currentUserInGame(
    uint8 _game,
    uint256 _id
  ) public view returns (bool) {
    return UserInGame[_game][GameIds[_game].current()][_id];
  }

  function userDetail(uint256 _userId) public view returns (user memory) {
    require(isUserExists[User[_userId].Address], "User not exists");
    return User[_userId];
  }

  function userTotalRefrerrs(
    uint256 _id
  )
    public
    view
    returns (uint256[] memory memberLevels, uint256[] memory partnersLevels)
  {
    uint256[] memory _memberLevels = new uint256[](5);
    uint256[] memory _partnersLevels = new uint256[](5);

    for (uint8 i = 0; i < 5; i++) {
      _memberLevels[i] = MembersRefByLevel[i][_id];
      _partnersLevels[i] = PartnersRefByLevel[i][_id];
    }

    return (_memberLevels, _partnersLevels);
  }

  function CompGames() public view returns (compGame[] memory) {
    return compGames;
  }

  /********************************************************
                        View Functions
  ********************************************************/

  event _registered(
    uint256 indexed _id,
    uint256 _ref,
    uint8 _plan,
    address _address,
    uint256 timestamp
  );

  event _upgraded(
    uint256 indexed _id,
    uint256 _ref,
    uint8 _plan,
    address _address,
    uint256 timestamp
  );

  event _renewed(
    uint256 indexed _id,
    uint256 _ref,
    uint8 _plan,
    address _address,
    uint256 timestamp
  );

  event _uplineMemberRef(
    uint256 indexed _id,
    uint256 _ref,
    uint8 _plan,
    address _address,
    uint256 _amount,
    uint256 timestamp
  );

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  event _picked(
    uint256 indexed _id,
    uint256 _ref,
    uint8 _plan,
    uint8 _game,
    uint256 _gameId,
    uint256 _amount,
    uint256 _timestamp
  );

  event _uplinePicksRef(
    uint256 indexed _id,
    uint256 _ref,
    uint8 _plan,
    address _address,
    uint8 _game,
    uint256 _amount,
    uint256 timestamp
  );

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  event _winnersAnnounced(
    uint8 _game,
    uint256 _gameId,
    uint8[] _winners,
    uint256 _timestamp
  );

  event _prizesWithdraw(
    uint8 _game,
    uint256 _gameId,
    uint256 _amount,
    uint256 _timestamp
  );

  event _prizesWinner(
    uint256 indexed _id,
    uint256 _ref,
    uint8 _plan,
    address _address,
    uint8 _game,
    uint256 _gameId,
    uint8 _prize,
    uint256 _amount,
    uint256 _timestamp
  );

  event _uplinePrizesRef(
    uint256 indexed _id,
    uint256 _ref,
    uint8 _plan,
    address _address,
    uint8 _prize,
    uint8 _game,
    uint256 _gameId,
    uint256 _amount,
    uint256 timestamp
  );
}
