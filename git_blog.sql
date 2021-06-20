-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 18 Jun 2021 pada 16.12
-- Versi server: 10.4.18-MariaDB
-- Versi PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `git_blog`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `created_at`) VALUES
(1, 'Necessitatibus odit consequatur dolorem quae quo voluptatem itaque.', 'Necessitatibus odit consequatur dolorem quae quo voluptatem itaque.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2021-06-18 08:17:35'),
(2, 'Dolorum quo tempore amet voluptas aliquam quidem sint qui.', 'Dolorum quo tempore amet voluptas aliquam quidem sint qui.', '2021-06-18 06:10:59'),
(3, 'Neque ducimus illum cumque magni enim sed.', 'Neque ducimus illum cumque magni enim sed.', '2021-06-18 06:10:50'),
(4, 'Aspernatur quod qui possimus delectus at voluptatem reiciendis.', 'Aspernatur quod qui possimus delectus at voluptatem reiciendis.', '2021-06-18 06:10:50'),
(5, 'Aspernatur ea voluptas earum aut saepe harum.', 'Aspernatur ea voluptas earum aut saepe harum.', '2021-06-18 06:10:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Jundana', 'jundana1@mail.com', '$2b$10$eTlPv3u7UP3hG15XTNdvdeF64GTkJMxsSE8KZMB/AP3pzxss7501m'),
(2, 'Jundana AB', 'jundana2@mail.com', '$2b$10$eTlPv3u7UP3hG15XTNdvdeF64GTkJMxsSE8KZMB/AP3pzxss7501m'),
(3, 'M Jundana AB', 'jundana3@mail.com', '$2b$10$eTlPv3u7UP3hG15XTNdvdeF64GTkJMxsSE8KZMB/AP3pzxss7501m');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
