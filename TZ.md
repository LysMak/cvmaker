# Fast CV Maker — MVP

## 1. Идея продукта

Простой онлайн-сервис для быстрого создания персональной CV-страницы.

Пользователь вставляет свой текст — готовое резюме, описание опыта, данные из LinkedIn или просто информацию о себе в свободной форме.

Сервис автоматически:

1. анализирует текст;
2. выделяет основные данные;
3. структурирует CV;
4. оформляет его в современном шаблоне;
5. публикует как персональную веб-страницу.

Главный принцип:

**Paste your CV → Get your page.**

Без ручного заполнения десятков полей.

---

# 2. Основной пользовательский сценарий

## Шаг 1 — Главная

Минималистичная страница.

Hero:

**Turn your CV into a beautiful website.**

Подзаголовок:

Paste your CV or describe your experience.
We'll turn it into a professional page in seconds.

Большое текстовое поле:

**Paste your CV here…**

Допускается:

* обычный текст;
* CV, скопированное из Word/PDF;
* текст из LinkedIn;
* произвольное описание опыта.

Кнопка:

**Create my CV**

На первом этапе загрузку файлов можно не делать.

---

# 3. AI-обработка

После отправки текста AI преобразует его в структурированный JSON.

Пример структуры:

```json
{
  "name": "John Smith",
  "headline": "Frontend Developer",
  "location": "Prague, Czech Republic",
  "email": "john@example.com",
  "phone": "",
  "about": "Frontend developer with...",
  "experience": [
    {
      "company": "Company Name",
      "position": "Frontend Developer",
      "start": "2022",
      "end": "Present",
      "description": "..."
    }
  ],
  "education": [],
  "skills": [
    "React",
    "TypeScript",
    "CSS"
  ],
  "languages": [],
  "links": {
    "linkedin": "",
    "github": "",
    "website": ""
  }
}
```

AI должен:

* исправлять очевидные ошибки;
* структурировать информацию;
* не придумывать отсутствующие факты;
* слегка улучшать формулировки;
* сохранять язык исходного CV;
* определять имя, профессию, контакты, опыт, образование, навыки и ссылки.

Если какого-либо блока нет — он просто не показывается.

---

# 4. Генерация CV

После обработки пользователь сразу получает preview готовой страницы.

Структура страницы:

### Header

* имя;
* должность / специализация;
* город;
* контакты;
* ссылки.

### About

Короткое профессиональное описание.

### Experience

Timeline или карточки:

**Frontend Developer**
Company Name
2022 — Present

Описание.

### Education

Учебное заведение, специальность, период.

### Skills

Компактные теги или список.

### Languages

Язык + уровень, если указан.

### Links

LinkedIn / GitHub / Portfolio / другие ссылки.

---

# 5. Шаблоны

Для MVP достаточно **3 шаблонов**.

### Minimal

Очень чистый, белый, типографический.

Подходит разработчикам, менеджерам, офисным профессиям.

### Modern

Более выразительная типографика, цветной accent, карточки.

Подходит digital / marketing / startup.

### Creative

Более крупные заголовки, необычная композиция.

Подходит дизайнерам, фотографам, creative professions.

Все шаблоны используют **одни и те же данные JSON**.

Переключение шаблона не требует повторной AI-генерации.

---

# 6. Быстрые настройки

В preview пользователь может изменить:

**Template**

Minimal / Modern / Creative

**Accent color**

5–8 заранее подготовленных цветов.

**Font**

2–3 варианта.

Также должна быть возможность вручную отредактировать текст CV.

Для MVP достаточно простого редактирования отдельных секций без полноценного visual builder.

---

# 7. Публикация

Кнопка:

**Publish CV**

После публикации создаётся URL:

`domain.com/john-smith`

или при занятом slug:

`domain.com/john-smith-2`

Публичная страница должна быть:

* responsive;
* быстрой;
* SEO-friendly;
* доступной без авторизации;
* пригодной для отправки работодателю;
* красиво отображаться при отправке ссылки в мессенджерах и соцсетях.

---

# 8. Public CV page

Для страницы генерировать:

```html
<title>John Smith — Frontend Developer</title>

<meta
  name="description"
  content="Frontend Developer based in Prague..."
>
```

Open Graph:

* имя;
* профессия;
* короткое описание;
* автоматически созданная OG-картинка.

Пример:

**John Smith**
Frontend Developer
Prague, Czech Republic

---

# 9. Архитектура

Рекомендуемый стек:

**Frontend**

* Next.js
* TypeScript
* Tailwind CSS

**Hosting**

* Vercel

**Database**

* Supabase / PostgreSQL

**AI**

* OpenAI API

Основная модель данных:

```text
CV
├── id
├── slug
├── source_text
├── structured_data JSON
├── template
├── accent
├── font
├── created_at
├── updated_at
└── published
```

На первом этапе всю структуру CV удобно хранить в `JSONB`.

---

# 10. API

Минимально нужны endpoints:

```text
POST /api/cv/generate
```

Получает:

```json
{
  "text": "..."
}
```

Возвращает структурированное CV.

```text
POST /api/cv
```

Создаёт CV.

```text
PATCH /api/cv/:id
```

Обновляет данные / дизайн.

```text
POST /api/cv/:id/publish
```

Публикует CV.

```text
GET /api/cv/:slug
```

Получает опубликованное CV.

---

# 11. UX генерации

После нажатия **Create my CV** не показывать обычный spinner.

Показывать короткий процесс:

✓ Reading your CV
✓ Organizing your experience
✓ Highlighting your skills
✓ Building your page

**Your CV is ready ✓**

После этого автоматически открыть preview.

---

# 12. Что НЕ делаем в MVP

Не добавлять пока:

* регистрацию;
* личный кабинет;
* оплату;
* PDF export;
* импорт LinkedIn через API;
* десятки шаблонов;
* drag & drop editor;
* AI-фотографии;
* аналитику просмотров;
* custom domains;
* cover letter generator;
* вакансии;
* ATS scoring.

Это следующие этапы.

---

# 13. MVP flow

```text
Landing
   ↓
Paste CV
   ↓
AI parsing
   ↓
Structured JSON
   ↓
CV Preview
   ↓
Choose template / color
   ↓
Edit if necessary
   ↓
Publish
   ↓
domain.com/name
```

# 14. Критерий готовности MVP

Продукт считается готовым, когда новый пользователь может:

**зайти → вставить CV → получить красивую страницу → выбрать оформление → опубликовать → отправить ссылку работодателю**

за **1–2 минуты**.

Главная ценность продукта — не «CV builder», где пользователь снова заполняет 20 форм.

Главная ценность:

**У человека CV уже есть. Мы просто превращаем его в красивую профессиональную веб-страницу максимально быстро.**
