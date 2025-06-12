import 'katex/dist/katex.min.css';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { Skeleton as BothubSkeleton } from '@/ui/components/skeleton';
import {
  Message,
  MessageAvatar,
  MessageBadgeProgress,
  MessageButton,
  MessageButtons,
  MessageFile,
  MessageFiles,
  MessageImage,
  MessageImageBottomArrowButton,
  MessageImageButton,
  MessageImageButtons,
  MessageImageGrid,
  MessageImageLeftArrowButton,
  MessageImageRightArrowButton,
  MessageImageTopArrowButton,
  MessageMarkdown,
  MessageTag,
  MessageTransaction,
  MessageVoice,
  MessageReasoningBlock
} from '@/ui/components/message';
import { StoryDecorator } from '@/ui/story-decorator';
import { Gpt35Icon } from '@/ui/icons/gpt-3_5';
import { Gpt4Icon } from '@/ui/icons/gpt-4';
import { ClaudeIcon } from '@/ui/icons/claude';
import {
  BadgeProgress,
  BadgeProgressText,
  BadgeProgressTextBold
} from '@/ui/components/badge';
import image from './assets/image.png';
import image1 from './assets/image-1.png';
import image2 from './assets/image-2.png';
import image3 from './assets/image-3.png';
import image4 from './assets/image-4.png';
import imageProgress from './assets/image-progress.png';
import sound from './assets/sound.wav';
import videoWebm from './assets/sample-5s.webm';
import {
  AIIcon,
  COTR1Icon,
  DownloadImgIcon,
  ExpandIcon,
  GenerationIcon,
  MjWhiteIcon,
  SearchPlusIcon,
  SquareIcon,
  StopIcon,
  UpdateIcon,
  UpscaleIcon,
  WebSearchIcon,
  XlsBigIcon
} from '@/ui/icons';
import { Typography } from '@/ui/components/typography';
import { MessageSearchResults } from '../search-results';
import { MessageVideo } from '../video';

export type MessageMeta = Meta<typeof Message>;

export type MessageStory = StoryObj<typeof Message>;

export const Basic: MessageStory = {
  args: {
    variant: 'assistant',
    name: 'ChatGPT',
    color: 'purple',
    tags: <MessageTag>gpt-4</MessageTag>,
    avatar: (
      <MessageAvatar>
        <Gpt4Icon />
      </MessageAvatar>
    ),
    transaction: <MessageTransaction>-1571 CAPS</MessageTransaction>,
    children:
      "Certainly! Below is a step-by-step guide on how to create a simple to-do list application using React:\n\n1. **Set up a new React project:**\n   If you haven't already created a new React project, you can do so by running the following command:\n\n   ```bash\n   npx create-react-app todo-list\n   ```\n\n   Then, navigate into your new project directory:\n\n   ```bash\n   cd todo-list\n   ```\n\n2. **Create the ToDoList component:**\n   Inside your `src` directory, create a new file named `TodoList.js`. This will be your main to-do list component.\n\n   Add the following code to `TodoList.js`:\n\n   ```jsx\n   import React, { useState } from 'react';\n\n   function TodoList() {\n     const [tasks, setTasks] = useState([]);\n     const [taskInput, setTaskInput] = useState('');\n\n     const handleAddTask = () => {\n       if (taskInput.trim() !== '') {\n         setTasks([...tasks, taskInput]);\n         setTaskInput('');\n       }\n     };\n\n     const handleDeleteTask = (taskIndex) => {\n       const newTasks = tasks.filter((_, index) => index !== taskIndex);\n       setTasks(newTasks);\n     };\n\n     return (\n       <div>\n         <h1>Todo List</h1>\n         <input\n           type=\"text\"\n           value={taskInput}\n           onChange={(e) => setTaskInput(e.target.value)}\n           placeholder=\"Enter a new task\"\n         />\n         <button onClick={handleAddTask}>Add Task</button>\n         <ul>\n           {tasks.map((task, index) => (\n             <li key={index}>\n               {task}\n               <button onClick={() => handleDeleteTask(index)}>Delete</button>\n             </li>\n           ))}\n         </ul>\n       </div>\n     );\n   }\n\n   export default TodoList;\n   ```\n\n3. **Use the TodoList component in your application:**\n   In the `src` directory, open the `App.js` file and import the `TodoList` component:\n\n   ```jsx\n   import React from 'react';\n   import TodoList from './TodoList';\n\n   function App() {\n     return (\n       <div className=\"App\">\n         <TodoList />\n       </div>\n     );\n   }\n\n   export default App;\n   ```\n\n4. **Add styling (optional):**\n   If you want to add some basic styling, you can create a `TodoList.css` file in the `src` directory and import it into your `TodoList.js` file.\n\n5. **Run your application:**\n   In your terminal, start your React application by running:\n\n   ```bash\n   npm start\n   ```\n\n   This will open your to-do list application in the browser, where you can add and delete tasks.\n\nThat's it! You now have a basic to-do list application built with React."
  }
};

export const OneLineFeedText: MessageStory = {
  args: {
    ...Basic.args,
    children:
      'Так близко, неважно, насколько далеко\nНе могло быть ближе от сердца\nВечно доверяя тем, кто мы есть\nИ больше ничего не имеет значения\n\nВ сердце тихо падает звезда,\nМечта, что сбыться так и не смогла.\nНо верю я - придет светлая пора,\nИ снова зажигаться будет надежда.'
  }
};

export const Assistant: MessageStory = {
  args: {
    variant: 'assistant',
    avatar: <MessageAvatar variant="bot" />,
    transaction: <MessageTransaction>-1571 CAPS</MessageTransaction>,
    children: 'Привет! Чем я могу помочь? $2+3/2$'
  }
};

export const Typing: MessageStory = {
  args: {
    ...Assistant.args,
    typing: true
  }
};

export const Skeleton: MessageStory = {
  args: {
    variant: 'assistant',
    avatar: (
      <MessageAvatar>
        <BothubSkeleton />
      </MessageAvatar>
    ),
    skeleton: true
  }
};

export const MultilineCode: MessageStory = {
  args: {
    ...Assistant.args,
    children: `Конечно! Вот пример кода на JavaScript для вывода фразы "Hello, World!":
\`\`\`javascript
function main() {
  console.log("Hello, World!");
}
\`\`\``
  }
};

export const InlineCode: MessageStory = {
  args: {
    ...MultilineCode.args,
    children: `Конечно! Вот пример кода на JavaScript для вывода фразы "Hello, World!" 
\`console.log("Hello, World!");\``
  }
};

export const Table: MessageStory = {
  args: {
    ...Assistant.args,
    children:
      '| Original Name | Full Name | Functions |\n|--------------|-----------|-----------|\n| HTML | HyperText Markup Language | Defines the structure of a webpage |\n| CSS | Cascading Style Sheets | Defines the appearance of a webpage |\n| JavaScript | JavaScript |'
  }
};

export const List: MessageStory = {
  args: {
    ...Assistant.args,
    children:
      'Конечно! Вот пример маркированного списка <ul />\n- Text\n- Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text\n- Text\n\t- Text\n\t- Text\n- Text\n- Text'
  }
};

export const NumberList: MessageStory = {
  args: {
    ...Assistant.args,
    children:
      'Конечно! Вот пример маркированного списка <ol />\n1. Text\n2. Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text\n\t1. Text\n\t2. Text\n3. Text\n4. Text'
  }
};

export const Bold: MessageStory = {
  args: {
    ...Assistant.args,
    children: 'Конечно! Вот пример **жирного текста** для чата'
  }
};

export const Italic: MessageStory = {
  args: {
    ...Assistant.args,
    children: 'Конечно! Вот пример *курсивного текста* для чата'
  }
};

export const Title: MessageStory = {
  args: {
    ...Assistant.args,
    children:
      '# Пример заголовка H1\n## Пример заголовка H2\n### Пример заголовка H3\n#### Пример заголовка H4\n##### Пример заголовка H5\n###### Пример заголовка H6'
  }
};

export const Link: MessageStory = {
  args: {
    ...Assistant.args,
    children: 'Конечно! Вот пример [ссылки](https://bothub.chat)'
  }
};

export const Image: MessageStory = {
  args: {
    ...Assistant.args,
    children: `Конечно! Вот пример изображения для чата:\n\n![Image](${image})`
  }
};

export const Buttons: MessageStory = {
  args: {
    ...Image.args,
    buttons: (
      <MessageButtons>
        <MessageButton startIcon={<StopIcon />}>Остановить</MessageButton>
        <MessageButton startIcon={<UpdateIcon />}>Регенерировать</MessageButton>
        <MessageButton startIcon={<AIIcon />}>Vary (Strong)</MessageButton>
        <MessageButton startIcon={<AIIcon />}>Vary (Subtle)</MessageButton>
        <MessageButton startIcon={<SearchPlusIcon />}>
          Zoom Out 1.5x
        </MessageButton>
        <MessageButton startIcon={<SearchPlusIcon />}>
          Zoom Out 2x
        </MessageButton>
        <MessageButton startIcon={<SquareIcon />}>Make Square</MessageButton>
        <MessageButton startIcon={<UpscaleIcon />}>
          Upscale (Subtle)
        </MessageButton>
        <MessageButton startIcon={<UpscaleIcon />}>
          Upscale (Creative)
        </MessageButton>
      </MessageButtons>
    )
  }
};

export const Badge: MessageStory = {
  args: {
    ...Assistant.args,
    after: (
      <MessageBadgeProgress>
        <BadgeProgressText>
          <BadgeProgressTextBold>ChatGPT</BadgeProgressTextBold> генерирует...
        </BadgeProgressText>
      </MessageBadgeProgress>
    )
  }
};

export const Gpt3: MessageStory = {
  args: {
    variant: 'assistant',
    name: 'ChatGPT',
    color: 'green',
    tags: <MessageTag>gpt-3.5-turbo</MessageTag>,
    avatar: (
      <MessageAvatar>
        <Gpt35Icon />
      </MessageAvatar>
    ),
    transaction: <MessageTransaction>-1571 CAPS</MessageTransaction>,
    children: 'Привет! Чем я могу помочь?'
  }
};

export const Gpt4: MessageStory = {
  args: {
    variant: 'assistant',
    name: 'ChatGPT',
    color: 'purple',
    tags: <MessageTag>gpt-4</MessageTag>,
    avatar: (
      <MessageAvatar>
        <Gpt4Icon />
      </MessageAvatar>
    ),
    transaction: <MessageTransaction>-1571 CAPS</MessageTransaction>,
    children: 'Привет! Чем я могу помочь?'
  }
};

export const Claude2: MessageStory = {
  args: {
    variant: 'assistant',
    name: 'Claude 2',
    avatar: (
      <MessageAvatar>
        <ClaudeIcon />
      </MessageAvatar>
    ),
    transaction: <MessageTransaction>-1571 CAPS</MessageTransaction>,
    children: 'Привет! Чем я могу помочь?'
  }
};

export const MidjourneyImages: MessageStory = {
  args: {
    ...Buttons.args,
    variant: 'assistant',
    name: 'Midjourney',
    tags: <MessageTag>6.0</MessageTag>,
    avatar: (
      <MessageAvatar>
        <MjWhiteIcon />
      </MessageAvatar>
    ),
    transaction: <MessageTransaction>-1571 CAPS</MessageTransaction>,
    children: (
      <MessageImageGrid>
        <MessageImage
          src={image1}
          width={256}
          height={256}
          alt="MJ Image"
          clickable
          buttons={
            <MessageImageButtons>
              <MessageImageButton>
                <GenerationIcon />
              </MessageImageButton>
              <MessageImageButton>
                <ExpandIcon />
              </MessageImageButton>
              <MessageImageButton>
                <DownloadImgIcon />
              </MessageImageButton>
            </MessageImageButtons>
          }
        />
        <MessageImage
          src={image2}
          width={256}
          height={256}
          alt="MJ Image"
          clickable
          buttons={
            <MessageImageButtons>
              <MessageImageButton>
                <GenerationIcon />
              </MessageImageButton>
              <MessageImageButton>
                <ExpandIcon />
              </MessageImageButton>
              <MessageImageButton>
                <DownloadImgIcon />
              </MessageImageButton>
            </MessageImageButtons>
          }
        />
        <MessageImage
          src={image3}
          width={256}
          height={256}
          alt="MJ Image"
          clickable
          buttons={
            <MessageImageButtons>
              <MessageImageButton>
                <GenerationIcon />
              </MessageImageButton>
              <MessageImageButton>
                <ExpandIcon />
              </MessageImageButton>
              <MessageImageButton>
                <DownloadImgIcon />
              </MessageImageButton>
            </MessageImageButtons>
          }
        />
        <MessageImage
          src={image4}
          width={146}
          height={256}
          alt="MJ Image"
          clickable
          buttons={
            <MessageImageButtons>
              <MessageImageButton>
                <GenerationIcon />
              </MessageImageButton>
              <MessageImageButton>
                <ExpandIcon />
              </MessageImageButton>
              <MessageImageButton>
                <DownloadImgIcon />
              </MessageImageButton>
            </MessageImageButtons>
          }
        />
      </MessageImageGrid>
    )
  }
};

export const MidjourneyImagesProgress: MessageStory = {
  args: {
    ...MidjourneyImages.args,
    children: (
      <>
        <MessageImage
          src={imageProgress}
          width={512}
          height={512}
          alt="MJ Image"
          progress
        />
        <BadgeProgress value={69}>
          <BadgeProgressText>
            <BadgeProgressTextBold>Midjourney</BadgeProgressTextBold> генерирует{' '}
            <BadgeProgressTextBold>69%</BadgeProgressTextBold>
          </BadgeProgressText>
        </BadgeProgress>
      </>
    )
  }
};

export const MidjourneyBigImage: MessageStory = {
  args: {
    ...MidjourneyImages.args,
    children: (
      <>
        <MessageImage
          src={`https://storage.bothub.chat/bothub-storage/images/493f64c0-2c01-4046-b8cd-73d53d53a16b.png?${Date.now()}`}
          width={512}
          height={512}
          alt="MJ Image"
          progress
        />
        <BadgeProgress value={69}>
          <BadgeProgressText>
            <BadgeProgressTextBold>Midjourney</BadgeProgressTextBold> генерирует{' '}
            <BadgeProgressTextBold>69%</BadgeProgressTextBold>
          </BadgeProgressText>
        </BadgeProgress>
      </>
    )
  }
};

export const MidjourneyFetchImage: MessageStory = {
  args: {
    ...MidjourneyImages.args,
    children: (
      <>
        <MessageImage
          src="https://media.discordapp.net/attachments/1209813507516665937/1216389589334491146/bothubchat_Write_down_the_methodology_of_transformation_of_pers_da3dd8f7-4f6a-43e6-953b-c70f1db0e4e3.png?ex=66003615&is=65edc115&hm=6905bbb9665486d3eee78187e4d744ee35431df2686f552c6f4f875cf03e9e91&=&format=webp&quality=lossless"
          width={512}
          height={512}
          alt="MJ Image"
          progress
          fetchImage
        />
        <BadgeProgress value={69}>
          <BadgeProgressText>
            <BadgeProgressTextBold>Midjourney</BadgeProgressTextBold> генерирует{' '}
            <BadgeProgressTextBold>69%</BadgeProgressTextBold>
          </BadgeProgressText>
        </BadgeProgress>
      </>
    )
  }
};

export const MidjourneyUpscaleImage: MessageStory = {
  args: {
    ...MidjourneyImages.args,
    children: (
      <MessageImage
        src={image}
        width={512}
        height={512}
        alt="MJ Image"
        clickable
        buttons={
          <MessageImageButtons>
            <MessageImageLeftArrowButton />
            <MessageImageRightArrowButton />
            <MessageImageTopArrowButton />
            <MessageImageBottomArrowButton />
            <MessageImageButton>
              <DownloadImgIcon />
            </MessageImageButton>
          </MessageImageButtons>
        }
      />
    )
  }
};

export const User: MessageStory = {
  args: {
    variant: 'user',
    avatar: <MessageAvatar />,
    children: 'Привет бот'
  }
};

export const UserSkeleton: MessageStory = {
  args: {
    variant: 'user',
    avatar: (
      <MessageAvatar>
        <BothubSkeleton />
      </MessageAvatar>
    ),
    skeleton: true
  }
};

export const UpdatedContent: MessageStory = {
  args: {
    ...Assistant.args,
    typing: true,
    children: React.createElement(() => {
      const [content, setContent] = useState('Updated content...');

      useEffect(() => {
        let number: number = 0;

        const interval = window.setInterval(() => {
          setContent((content) => `${content} \n\n**${number++}**`);
        }, 1000);

        return () => {
          window.clearInterval(interval);
        };
      }, []);

      return <MessageMarkdown>{content}</MessageMarkdown>;
    })
  }
};

export const Files: MessageStory = {
  args: {
    ...User.args,
    children: (
      <>
        <MessageMarkdown>Привет! Вот держи файлы:</MessageMarkdown>
        <MessageFiles>
          <MessageFile
            icon={<XlsBigIcon />}
            name="bothubfile_archive.xls"
            size="367 KB"
          />
          <MessageFile
            name="bothubfile_archive.XLS"
            size="367 KB"
          />
          <MessageFile
            icon={<XlsBigIcon />}
            name="bothubfile_bothubfile_bothubfile_bothubfile_bothubfile_archive.xls"
            size="367 KB"
          />
          <MessageFile
            name="bothubfile_archive.docx"
            size="367 KB"
          />
          <MessageFile
            name="attach-file-big.svg"
            size="3 KB"
          />
        </MessageFiles>
      </>
    )
  }
};

export const Voice: MessageStory = {
  args: {
    ...User.args,
    children: (
      <MessageVoice
        src={sound}
        waveData={[
          89.41, 91.74, 53.74, 42.63, 15.19, 4.97, 2.1, 83.02, 89.86, 53.54,
          42.58, 15.21, 8.74, 2.17, 83.48, 80.1, 87.77, 53.81, 29.96, 15.04,
          3.37, 2.15, 84.77, 87.62, 54.25, 40.74, 15.21, 8.87, 2.11, 2.15
        ]}
        duration={6}
      >
        Beep, Beep, Beep, Beep, Beep, Beep, Beep, Beep, Beep, Beep, Beep, Beep,
        Beep, Beep, Beep, Beep, Beep, Beep, Beep, Beep, Beep, Beep, Beep, Beep,
        Beep, Beep, Beep, Beep, Beep, Beep, Beep, Beep
      </MessageVoice>
    )
  }
};

export const VoiceProcessing: MessageStory = {
  args: {
    ...User.args,
    children: null,
    after: (
      <MessageBadgeProgress>
        <BadgeProgressText>
          <BadgeProgressTextBold>Голосовое сообщение</BadgeProgressTextBold>{' '}
          обрабатывается...
        </BadgeProgressText>
      </MessageBadgeProgress>
    )
  }
};
export const Video: MessageStory = {
  args: {
    ...User.args,
    children: <MessageVideo src={videoWebm} />
  }
};

export const MarkdownImage: MessageStory = {
  args: {
    ...Assistant.args,
    children: `![Image](${image1})`
  }
};

export const NewDesignFeatures = () => {
  const [content, setContent] = useState('Hi! How can I help you?');

  return (
    <Message
      id="test-id"
      timestamp="Date Mon Oct 07 2024 21:20:03 GMT+0400 (Samara Standard Time)"
      variant="assistant"
      name="ChatGPT"
      avatar={<MessageAvatar />}
      copyPlainText="Копировать без форматирования"
      copyTgText="Копировать в TG"
      editText="Редактировать"
      resendText="Переотправить"
      deleteText="Удалить"
      copyTooltipLabel="Копировать"
      updateTooltipLabel="Повторная генерация"
      version={2}
      totalVersions={5}
      transaction={<MessageTransaction>-1571 CAPS</MessageTransaction>}
      buttons={
        <MessageButtons>
          <MessageButton startIcon={<StopIcon />}>Button</MessageButton>
        </MessageButtons>
      }
      content={content}
      onEdit={({ message }) => setContent(message ?? '')}
    >
      {content}
    </Message>
  );
};

export const Reasoning = () => {
  const [content, setContent] = useState('Hi! How can I help you?');

  return (
    <Message
      id="test-id"
      timestamp="Date Mon Oct 07 2024 21:20:03 GMT+0400 (Samara Standard Time)"
      variant="assistant"
      name="ChatGPT"
      avatar={<MessageAvatar />}
      copyPlainText="Копировать без форматирования"
      editText="Редактировать"
      resendText="Переотправить"
      deleteText="Удалить"
      copyTooltipLabel="Копировать"
      updateTooltipLabel="Повторная генерация"
      version={2}
      totalVersions={5}
      transaction={<MessageTransaction>-1571 CAPS</MessageTransaction>}
      buttons={
        <MessageButtons>
          <MessageButton startIcon={<StopIcon />}>Button</MessageButton>
        </MessageButtons>
      }
      content={content}
      onEdit={({ message }) => setContent(message ?? '')}
    >
      <MessageReasoningBlock
        buttonText={
          <>
            <WebSearchIcon size={16} />
            <Typography variant="body-l-regular">
              Нашел 25 результатов
            </Typography>
          </>
        }
        content={
          <MessageSearchResults
            results={[
              {
                url: 'https://www.google.com',
                name: 'Google',
                title: 'Google',
                date: new Date().toISOString(),
                content:
                  'Google is a search engine that allows users to find information on the internet. It is one of the most popular search engines in the world, with billions of searches per day. Google is known for its advanced search algorithms and user-friendly interface, making it a popular choice for both casual and professional users.'
              },
              {
                url: 'https://www.bing.com',
                name: 'www.techempowerup.com',
                title: 'Bing',
                date: new Date().toISOString(),
                content:
                  'Bing is a search engine that allows users to find information on the internet. It is one of the most popular search engines in the world, with billions of searches per day. Bing is known for its advanced search algorithms and user-friendly interface, making it a popular choice for both casual and professional users.\n\nBing is a search engine that allows users to find information on the internet. It is one of the most popular search engines in the world, with billions of searches per day. Bing is known for its advanced search algorithms and user-friendly interface, making it a popular choice for both casual and professional users.'
              }
            ]}
          />
        }
      />
      <MessageReasoningBlock
        buttonText={
          <>
            <COTR1Icon size={16} />
            <Typography variant="body-l-regular">Думал 41 секунду</Typography>
          </>
        }
        content={`Okay, the user wants a travel plan from Moscow to Shanghai. Let me start by figuring out the main components they need. First, they probably need flight options. I should check the common airlines that operate this route, like Aeroflot or China Eastern. Maybe there are direct flights or connections through cities like Beijing or Seoul. Flight duration is important too-direct flights might take around 8–9 hours.
  Next, visa requirements. Since they're going to China, Russian citizens might need a visa. I should mention checking the latest visa regulations, maybe applying through the embassy or a consulate. Also, COVID–19 restrictions could still be a thing, so advising them to check current entry requirements is a must.
  Accommodation in Shanghai-suggest some popular areas like Pudong or the Bund. Maybe list a few hotel options in different price ranges. Transportation within Shanghai: the metro system is efficient, so highlighting that, along with taxis and Didi. Maybe mention getting a transportation card for convenience.
  Sightseeing spots. The Bund, Yu Garden, Shanghai Tower, and maybe a day trip to Zhujiajiao. I should structure a day-by-day itinerary, like Day 1 for arrival and exploring Pudong, Day 2 for the Bund and Nanjing Road, etc. Including tips on local cuisine would be nice-soup dumplings, Peking duck. Maybe recommend some popular restaurants.
  Communication tips: downloading a translation app, getting a local SIM card. Currency exchange-using ATMs or exchanging rubles to yuan. Also, cultural etiquette like not tipping and learning basic Mandarin phrases.
  Health and safety: travel insurance, emergency numbers, being cautious in crowded areas. Additional tips like the best time to visit, maybe spring or autumn, and packing according to the season.`}
      />

      <MessageMarkdown>
        {`**План поездки из Москвы в Шанхай**  

### 1. **Подготовка перед поездкой**  
- **Авиабилеты**:  
  - Прямые рейсы: Аэрофлот, China Eastern (время в пути ~8–9 часов).  
  - С пересадкой: через Пекин, Гуанчжоу или Сеул (время в пути от 12 часов).  
  - Стоимость: от 35 000 RUB (эконом-класс, зависит от сезона).  
- **Виза**:  
  - Для граждан РФ требуется туристическая виза в Китай.  
  - Оформите через консульство КНР в Москве (срок — 5–7 рабочих дней).  
- **COVID-19 и документы**:  
  - Уточните актуальные требования на сайте посольства (возможны ПЦР-тесты или QR-коды).  
- **Страховка**:  
  - Оформите медицинскую страховку с покрытием в Китае.  

---

### 2. **Прибытие в Шанхай**  
- **Аэропорт**: Pudong International Airport (PVG).  
- **Трансфер в город**:  
  - Маглев (поезд на магнитной подушке) до станции Longyang Road (7 минут, 50 CNY).  
  - Такси: ~200 CNY (40–60 минут).  
  - Метро: линия 2 (8 CNY, ~1 час).  

---

### 3. **Проживание**  
- **Районы**:  
  - **Пудонг** (современный район с небоскребами).  
  - **Бунд** (историческая набережная, виды на Skyline).  
  - **Французский квартал** (атмосферные кафе).  
- **Отели**:  
  - Бюджет: Captain Hostel (от 150 CNY/ночь).  
  - Средний уровень: Radisson Blu Bund (от 800 CNY).  
  - Люкс: Mandarin Oriental (от 2000 CNY).  

---

### 4. **Маршрут на 5 дней**  
**День 1**:  
- Прилет, заселение в отель.  
- Прогулка по **Пудону**: смотровая площадка Shanghai Tower (120 CNY), парк Century Park.  
- Ужин в ресторане местной кухни (попробуйте **xiaolongbao** — суповые пельмени).  

**День 2**:  
- **Бунд** (утренние фото), музей истории Шанхая.  
- Переезд на метро в старый город: **Юй Юань** (Сад Радости, 40 CNY) и рынок.  
- Вечер: шопинг на **Нанкинской улице**.  

**День 3**:  
- **Шанхайский Disneyland** (билет от 400 CNY) или музей науки и техники.  
- Ночная прогулка на кораблике по реке Хуанпу.  

**День 4**:  
- Поездка в **Чжуцзяцзяо** (Венеция Востока, 1 час от города): каналы и чайные домики.  
- Вечер: ужин в ресторане **M on the Bund** (европейско-азиатская кухня).  

**День 5**:  
- Шопинг в торговом центре **IAPM Mall**.  
- Вылет в Москву.  

---

### 5. **Лайфхаки**  
- **Транспорт**:  
  - Купите карту **Shanghai Public Transportation Card** для метро и автобусов.  
  - Используйте Didi (китайский Uber).  
- **Связь**:  
  - Купите SIM-карту China Mobile (потребуется паспорт).  
  - Установите VPN для доступа к Google/Instagram.  
- **Деньги**:  
  - Берите наличные юани (CNY). Карты UnionPay принимаются везде, Visa/Mastercard — редко.  
- **Язык**:  
  - Скачайте приложение **Pleco** (переводчик с офлайн-словарем).  

---

### 6. **Культура и безопасность**  
- **Чаевые** не приняты.  
- Вода из-под крана не питьевая — покупайте бутилированную.  
- В толпе следите за сумками (риск карманных краж).  

---

### 7. **Лучшее время для поездки**  
- **Весна (апрель–май)** и **осень (сентябрь–ноябрь)** — комфортная погода (+20–25°C).  

---

**Bon voyage!** Если нужна помощь с бронированием или деталями, пишите 😊`}
      </MessageMarkdown>
    </Message>
  );
};

export const ReasoningPending = () => {
  const [content, setContent] = useState('Hi! How can I help you?');

  return (
    <Message
      id="test-id"
      variant="assistant"
      name="ChatGPT"
      avatar={<MessageAvatar />}
      copyPlainText="Копировать без форматирования"
      editText="Редактировать"
      resendText="Переотправить"
      deleteText="Удалить"
      copyTooltipLabel="Копировать"
      updateTooltipLabel="Повторная генерация"
      disableEdit
      disableResend
      disableDelete
      disableUpdate
      disableCopy
      content={content}
      onEdit={({ message }) => setContent(message ?? '')}
    >
      <MessageReasoningBlock
        isReasoning
        buttonText={
          <>
            <COTR1Icon size={16} />
            <Typography variant="body-l-regular">Думаю...</Typography>
          </>
        }
      />
    </Message>
  );
};

export default {
  title: 'Components/Message/Item',
  component: Message,
  decorators: [StoryDecorator()],
  argTypes: {
    avatar: {
      table: {
        disable: true
      }
    },
    tokens: {
      table: {
        disable: true
      }
    },
    actions: {
      table: {
        disable: true
      }
    }
  }
} as MessageMeta;
