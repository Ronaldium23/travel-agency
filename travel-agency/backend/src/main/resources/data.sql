-- Borra todos los paquetes cada vez (solo para desarrollo, cuidado en producción)
TRUNCATE TABLE packages RESTART IDENTITY CASCADE;

-- Inserta 20 paquetes de viaje de ejemplo
INSERT INTO packages (name, description, price, duration, available, image_url, destination)
VALUES
    ('Aventura en la Patagonia', 'Explora glaciares y bosques milenarios', 450000, 5, true, 'https://example.com/patagonia.jpg', 'Chile'),
    ('Cultura Maya', 'Descubre las ruinas de Chichén Itzá y Tulum', 320000, 4, true, 'https://example.com/maya.jpg', 'México'),
    ('Safari en Sudáfrica', 'Observa los Cinco Grandes en su hábitat natural', 1200000, 7, true, 'https://example.com/safari.jpg', 'Sudáfrica'),
    ('Islas Griegas', 'Tour en crucero por Santorini, Mykonos y Creta', 890000, 8, true, 'https://example.com/greek.jpg', 'Grecia'),
    ('Trekking en Machu Picchu', 'Camino Inca hacia la ciudad perdida', 380000, 4, true, 'https://example.com/machu.jpg', 'Perú'),
    ('Buceo en Gran Barrera de Coral', 'Explora el arrecife más grande del mundo', 950000, 6, true, 'https://example.com/coral.jpg', 'Australia'),
    ('Tour por Toscana', 'Degustación de vinos y paisajes renacentistas', 680000, 5, true, 'https://example.com/toscana.jpg', 'Italia'),
    ('Auroras Boreales en Islandia', 'Caza de auroras y aguas termales', 1500000, 6, true, 'https://example.com/iceland.jpg', 'Islandia'),
    ('Selva Amazónica', 'Expedición con comunidades indígenas', 420000, 5, true, 'https://example.com/amazon.jpg', 'Brasil'),
    ('Ruta del Té en Sri Lanka', 'Plantaciones de té y templos budistas', 550000, 7, true, 'https://example.com/srilanka.jpg', 'Sri Lanka'),
    ('Fiordos Noruegos', 'Crucero por los fiordos y Bergen', 1100000, 7, true, 'https://example.com/norway.jpg', 'Noruega'),
    ('Costa Amalfitana', 'Positano, Ravello y limoncello', 720000, 5, true, 'https://example.com/amalfi.jpg', 'Italia'),
    ('Aventura en Nueva Zelanda', 'Deportes extremos y Hobbiton', 1400000, 10, true, 'https://example.com/nz.jpg', 'Nueva Zelanda'),
    ('Caribe Colombiano', 'Playas vírgenes y ciudad amurallada', 390000, 4, true, 'https://example.com/cartagena.jpg', 'Colombia'),
    ('Ruta de los Castillos en Alemania', 'Cuentos de hadas y cerveza', 480000, 6, true, 'https://example.com/germany.jpg', 'Alemania'),
    ('Desierto de Atacama', 'Observación astronómica y salares', 360000, 3, true, 'https://example.com/atacama.jpg', 'Chile'),
    ('Tailandia Exótica', 'Bangkok, templos y playas de ensueño', 670000, 8, true, 'https://example.com/thailand.jpg', 'Tailandia'),
    ('Alpes Suizos', 'Trenes panorámicos y chocolate', 1050000, 6, true, 'https://example.com/swiss.jpg', 'Suiza'),
    ('Japón Tradicional', 'Kioto, geishas y cerezos en flor', 1350000, 9, true, 'https://example.com/japan.jpg', 'Japón'),
    ('Crucero por el Nilo', 'Templos de Luxor, Karnak y Abu Simbel', 780000, 7, true, 'https://example.com/egypt.jpg', 'Egipto');