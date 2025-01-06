const {
  time,
  loadFixture
} = require("@nomicfoundation/hardhat-network-helpers");
const { formatEther, parseEther } = require("ethers/lib/utils");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

function EtherToWie(params) {
  return String(parseEther(`${params}`));
}

describe("LuckyMe", function () {
  let dai, luckyMe;
  let owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7;

  it("deploy smart contract", async function () {
    [owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7] =
      await ethers.getSigners();

    const Dai = await ethers.getContractFactory("Dai");
    dai = await Dai.deploy(1);

    const RandomNumberGenerator = await ethers.getContractFactory(
      "RandomNumberGenerator"
    );
    const randomNumberGenerator = await RandomNumberGenerator.deploy();

    const LuckyMe = await ethers.getContractFactory("LuckyMe");
    luckyMe = await LuckyMe.deploy(dai.address, randomNumberGenerator.address);
  });

  it("token transfer:", async () => {
    await dai.connect(owner).mint(addr1.address, EtherToWie(6000000));
    await dai.connect(owner).mint(addr2.address, EtherToWie(6000000));
    await dai.connect(owner).mint(addr3.address, EtherToWie(6000000));
    await dai.connect(owner).mint(addr5.address, EtherToWie(6000000));
  });

  let addr1id;
  let addr2id;
  let addr3id;
  it("registration:", async () => {
    await dai.connect(addr1).approve(luckyMe.address, EtherToWie(10));
    await luckyMe
      .connect(addr1)
      .register(String(await luckyMe.UserId(owner.address)), 0, addr1.address);
    addr1id = String(await luckyMe.connect(addr1).UserId(addr1.address));

    await dai.connect(addr2).approve(luckyMe.address, EtherToWie(10));
    await luckyMe.connect(addr2).register(addr1id, 0, addr2.address);
    addr2id = String(await luckyMe.connect(addr2).UserId(addr2.address));

    await dai.connect(addr3).approve(luckyMe.address, EtherToWie(10));
    await luckyMe.connect(addr3).register(addr2id, 0, addr3.address);
    addr3id = String(await luckyMe.connect(addr3).UserId(addr3.address));
  });

  it("enterGame:", async () => {
    expect(formatEther(String(await dai.balanceOf(luckyMe.address)))).to.equal(
      "0.0"
    );

    for (let i = 0; i < 50; i++) {
      await dai.connect(addr1).approve(luckyMe.address, EtherToWie(10000));
      await luckyMe.connect(addr1).enterGame(0, i, addr1id);
    }

    for (let i = 50; i < 100; i++) {
      await dai.connect(addr2).approve(luckyMe.address, EtherToWie(10000));
      await luckyMe.connect(addr2).enterGame(0, i, addr2id);
    }

    expect(formatEther(String(await dai.balanceOf(luckyMe.address)))).to.equal(
      "425.0"
    );

    await luckyMe.withdrawPrizes(0, 0);

    expect(formatEther(String(await dai.balanceOf(luckyMe.address)))).to.equal(
      "0.0"
    );
  });

  it("testing register:", async () => {
    expect(formatEther(String(await dai.balanceOf(luckyMe.address)))).to.equal(
      "0.0"
    );

    await dai.connect(addr5).approve(luckyMe.address, EtherToWie(1));
    await luckyMe
      .connect(addr5)
      .register(String(await luckyMe.UserId(owner.address)), 0, addr5.address);
    const UID = String(await luckyMe.connect(addr5).UserId(addr5.address));

    await dai.connect(addr5).approve(luckyMe.address, EtherToWie(1));
    await luckyMe.connect(addr5).renew(UID);

    await dai.connect(addr5).approve(luckyMe.address, EtherToWie(10));
    await luckyMe.connect(addr5).upgradePlan(UID);

    await dai.connect(addr5).approve(luckyMe.address, EtherToWie(10));
    await luckyMe.connect(addr5).renew(UID);

    expect(formatEther(String(await dai.balanceOf(luckyMe.address)))).to.equal(
      "0.0"
    );
  });

  it("testing enterGame revert:", async () => {
    expect(formatEther(String(await dai.balanceOf(luckyMe.address)))).to.equal(
      "0.0"
    );

    await dai.connect(addr1).approve(luckyMe.address, EtherToWie(5));
    await luckyMe.connect(addr1).enterGame(0, 0, addr1id);

    await dai.connect(addr1).approve(luckyMe.address, EtherToWie(5));
    await expect(
      luckyMe.connect(addr1).enterGame(10, 0, addr1id)
    ).to.be.revertedWith("Please choose correct game");
    await expect(
      luckyMe.connect(addr1).enterGame(0, 100, addr1id)
    ).to.be.revertedWith("Number is not correct");
    await expect(luckyMe.connect(addr1).enterGame(0, 0, 10)).to.be.revertedWith(
      "User not exists"
    );
    await expect(
      luckyMe.connect(addr1).enterGame(0, 0, addr1id)
    ).to.be.revertedWith("This number is already sell");

    await time.increaseTo((await time.latest()) + 365 * 24 * 60 * 60);
    await expect(
      luckyMe.connect(addr1).enterGame(0, 0, addr1id)
    ).to.be.revertedWith("It's Time To Renew");

    expect(formatEther(String(await dai.balanceOf(luckyMe.address)))).to.equal(
      "4.25"
    );
  });
});
