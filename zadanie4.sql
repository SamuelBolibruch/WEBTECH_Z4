-- phpMyAdmin SQL Dump
-- version 5.2.1deb1+jammy2
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: localhost:3306
-- Čas generovania: St 24.Apr 2024, 12:45
-- Verzia serveru: 8.0.36-0ubuntu0.22.04.1
-- Verzia PHP: 8.3.3-1+ubuntu22.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáza: `zadanie4`
--

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `connections`
--

CREATE TABLE `connections` (
  `id` int NOT NULL,
  `num_of_connections` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Sťahujem dáta pre tabuľku `connections`
--

INSERT INTO `connections` (`id`, `num_of_connections`) VALUES
(1, 29);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `searched_destinations`
--

CREATE TABLE `searched_destinations` (
  `id` int NOT NULL,
  `town` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `num_of_searches` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Sťahujem dáta pre tabuľku `searched_destinations`
--

INSERT INTO `searched_destinations` (`id`, `town`, `country`, `num_of_searches`) VALUES
(7, 'Rabcice', 'Slovakia', 11),
(8, 'Namestovo', 'Slovakia', 3),
(9, 'Bratislava', 'Slovakia', 10),
(10, 'Nove Mesto Nad Vahom', 'Slovakia', 2),
(11, 'Dlha Nad Oravou', 'Slovakia', 2),
(12, 'Stefanov', 'Slovakia', 7),
(13, 'Vavrecka', 'Slovakia', 3),
(14, 'Odense', 'Denmark', 4),
(15, 'Copenhagen', 'Denmark', 2);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `time_connections`
--

CREATE TABLE `time_connections` (
  `id` int NOT NULL,
  `time_range_1` int NOT NULL,
  `time_range_2` int NOT NULL,
  `time_range_3` int NOT NULL,
  `time_range_4` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Sťahujem dáta pre tabuľku `time_connections`
--

INSERT INTO `time_connections` (`id`, `time_range_1`, `time_range_2`, `time_range_3`, `time_range_4`) VALUES
(1, 22, 7, 0, 0);

--
-- Kľúče pre exportované tabuľky
--

--
-- Indexy pre tabuľku `connections`
--
ALTER TABLE `connections`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pre tabuľku `searched_destinations`
--
ALTER TABLE `searched_destinations`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pre tabuľku `time_connections`
--
ALTER TABLE `time_connections`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pre exportované tabuľky
--

--
-- AUTO_INCREMENT pre tabuľku `connections`
--
ALTER TABLE `connections`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pre tabuľku `searched_destinations`
--
ALTER TABLE `searched_destinations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pre tabuľku `time_connections`
--
ALTER TABLE `time_connections`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
