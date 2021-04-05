# Личный проект «Кексобукинг»

Описание проекта: Кексобукинг — сервис размещения объявлений о сдаче в аренду недвижимости в центре Токио. Пользователям предоставляется возможность размещать объявления о своей недвижимости или просматривать уже размещённые объявления.

## Содержание проекта

Проект представлен одностраничным сервисом, который содержит интерактивную карту, фильтр и форму.

- Страница имеет фиксированную ширину;

- Интерактивная карта реализована с помощью внешней библиотеки [leaflet](https://leafletjs.com/);

- Список похожих объявлений загружается с сервера с помощью AJAX-запроса и отображается на интерактивной карте, в виде меток, после ее инициализации;

- В случае проблем при загрузке данных о похожих объявлениях выводится предупреждающее сообщение;

- Максимальное число похожих объявлений на карте: 10 шт.;

- При фильтрации на карте отображается не больше 10 меток удовлетворяющим выбранным условиям;

- Форма размещения содержит обязательные и необязательные поля ввода. Обязательные поля имеют валидацию и сообщают об ошибках при вводе пользователем некорректной информации;

- Поле "адрес" заполняется автоматически в зависимости от перемещения главной метки на карте;

- После заполнения всех данных, при нажатии на кнопку «Опубликовать», все данные из формы, включая изображения, с помощью AJAX-запроса отправляются на сервер.

- В случае успешной отправки данных показывается соответствующее сообщение, а поля формы очищаются;

- В случае не успешной отправки данных показывается соответствующее сообщение, а поля формы сохранаются для повторной попытки отправить данные;

## Дополнительно
- Все зависимости проекта указаны в файле package.json. Команда npm install установит всё необходимое для того, чтобы сборка проекта работала;
- Итоговые файлы проекта находятся в папке build/;
- Исходные JS-файлы проекта находятся в папке source/
- Команда npm start запустит локальный сервер;
- Команда npm run build запустит webpack, мод production для сборки и оптимизации js-файлов проекта;

- Проекта выполнен в рамках [курса](https://htmlacademy.ru/intensive/javascript) JavaScript. Профессиональная разработка веб-интерфейсов.