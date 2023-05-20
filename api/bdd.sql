-- Modelo 1: Videojuegos
CREATE TABLE Videogames (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  plataformas VARCHAR(255) NOT NULL,
  imagen VARCHAR(255),
  fecha_de_lanzamiento DATE NOT NULL,
  rating DECIMAL(3,1) NOT NULL
);

-- Modelo 2: Géneros
CREATE TABLE Genres (
  id INT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL
);

-- Tabla de relación muchos a muchos
CREATE TABLE Videogame_Genres (
  id INT PRIMARY KEY,
  id_videojuego INT,
  id_genero INT,
  FOREIGN KEY (id_videojuego) REFERENCES Videojuegos(id),
  FOREIGN KEY (id_genero) REFERENCES Generos(id)
);
