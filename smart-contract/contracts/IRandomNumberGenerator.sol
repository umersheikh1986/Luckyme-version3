// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IRandomNumberGenerator {
    function randomNumberGenerator(uint8 number) external view returns (uint8);
}
