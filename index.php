<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Интерактивная страница</title>
        <link rel="stylesheet" href="css/styles.css">
    </head>
    <body>
        <!-- Другие блоки ДО нашего блока -->
        <section class="other-block">
            <h1>Начало страницы</h1>
            <p>Прокрутите вниз, чтобы увидеть интерактивный блок...</p>
        </section>

        



        <div class="container">
            <div class="sticky-step-block">
                <div class="titles-container">
                    <h2 class="title active" data-index="0">Заголовок 1</h2>
                    <h2 class="title" data-index="1">Заголовок 2</h2>
                    <h2 class="title" data-index="2">Заголовок 3</h2>
                </div>
                <div class="images-container" id="imagesContainer">
                    <div class="image-slide" data-index="0" style="background-image: url('images/image1.jpg')"></div>
                    <div class="image-slide" data-index="1" style="background-image: url('images/image2.jpg')"></div>
                    <div class="image-slide" data-index="2" style="background-image: url('images/image3.jpg')"></div>
                </div>
                </div>



        </div>

        <div class="container">
            <div class="smart-marquee">
                <div class="marquee-text">
                Бегущая строка реагирует на скролл: вниз → влево, вверх → вправо. Скорость зависит от скорости скролла.
                </div>
            </div>
        </div>

        <div class="container">
            <button class="magnetic-btn">Нажми меня</button>
        </div>

        

        <div class="adaptive-layers">
            <div class="background-layer">
                <svg>...</svg>
            </div>
            <div class="photo-layer">
                <img src="images/photo1.jpg" class="photo photo-1">
                <img src="images/photo2.jpg" class="photo photo-2">
                <img src="images/photo3.jpg" class="photo photo-3">
            </div>
            <h1 class="main-title">Крупный заголовок</h1>
        </div>

        <!-- Скрипты подключаем в конце body -->
        <script src="js/sticky-step.js"></script>
        <script src="js/magnetic-marquee.js"></script>
        <script src="js/smart-marquee.js"></script>
        <script src="js/adaptive-layers.js"></script>
    </body>
</html>
