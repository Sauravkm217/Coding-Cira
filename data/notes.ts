export interface NoteTopic {
  id: string;
  title: string;
  subtitle: string;
  readTimeMinutes: number;
  coinsOnComplete: number;
  paragraphs: string[];
  codeSnippet?: string;
  keyTakeaway: string;
}

export interface TrackNotes {
  trackId: string;
  trackName: string;
  icon: string;
  color: string;
  description: string;
  topics: NoteTopic[];
}

export const TRACK_NOTES: Record<string, TrackNotes> = {
  c: {
    trackId: 'c',
    trackName: 'Basics of C',
    icon: '🚀',
    color: 'var(--primary)',
    description: 'Foundational study notes on C syntax, print commands, data storage, and branch logic.',
    topics: [
      {
        id: 'c-output',
        title: 'Printing to the Screen with printf()',
        subtitle: 'Talking to your user through the console',
        readTimeMinutes: 1,
        coinsOnComplete: 15,
        paragraphs: [
          'In C, the computer does not know how to display text on its own until you include the standard input/output library (`#include <stdio.h>`). This library grants you access to `printf()`, which stands for "print formatted".',
          'Whenever you want to display words or numbers, you enclose your message in double quotes inside `printf("Hello World!\\n");`. The `\\n` is a special escape character that moves the cursor to a new line, keeping your console clean and readable.',
          'Notice the semicolon `;` at the end of the line! In C, every command statement must finish with a semicolon. Forgetting it is like forgetting a period at the end of an essay sentence—the compiler won\'t understand where your instruction ends.'
        ],
        codeSnippet: `#include <stdio.h>\n\nint main() {\n    printf("Hello, Cira Explorer!\\n");\n    return 0;\n}`,
        keyTakeaway: 'Use printf("...") from <stdio.h> to output text, and always end your statement with a semicolon ;'
      },
      {
        id: 'c-variables',
        title: 'Storing Whole Numbers with int',
        subtitle: 'Creating memory containers for your data',
        readTimeMinutes: 1,
        coinsOnComplete: 15,
        paragraphs: [
          'Think of a variable as a labeled storage box in the computer\'s RAM memory. Before you can put anything inside the box, C requires you to declare what kind of data the box is allowed to hold.',
          'For whole numbers (integers like 10, 50, or -5), we use the keyword `int`. For example, writing `int score = 100;` tells the computer: "Reserve space for an integer named score, and store the number 100 inside it."',
          'You can print the value stored in an int variable using the `%d` format specifier inside printf: `printf("Score: %d\\n", score);`. The `%d` acts as a placeholder that gets replaced by the number.'
        ],
        codeSnippet: `int score = 100;\nint lives = 3;\nprintf("Player has %d score and %d lives!\\n", score, lives);`,
        keyTakeaway: 'Declare whole numbers using int name = value; and print them using the %d placeholder.'
      },
      {
        id: 'c-conditions',
        title: 'Making Decisions with if Statements',
        subtitle: 'Empowering your program with smart choices',
        readTimeMinutes: 1,
        coinsOnComplete: 15,
        paragraphs: [
          'Programs become truly exciting when they can make decisions! In C, we use the `if` statement to check whether a question or mathematical condition evaluates to true.',
          'The condition you want to test is enclosed in parentheses: `if (score >= 50)`. If the condition is true, the computer executes all instructions grouped inside the curly braces `{ ... }`. If false, it skips over them entirely.',
          'You can compare numbers using comparison operators: `>` (greater than), `<` (less than), `==` (is equal to), and `>=` (greater than or equal to). Be careful: use double equals `==` to compare, and single equals `=` to assign!'
        ],
        codeSnippet: `int score = 75;\nif (score >= 50) {\n    printf("Level Passed! Good job!\\n");\n}`,
        keyTakeaway: 'Check conditions with if (condition) { ... } to branch execution based on logic.'
      }
    ]
  },

  cpp: {
    trackId: 'cpp',
    trackName: 'Basics of C++',
    icon: '✨',
    color: 'var(--secondary)',
    description: 'Object-Oriented Programming, stream pipelines, and building reusable blueprints.',
    topics: [
      {
        id: 'cpp-streams',
        title: 'Character Output with std::cout',
        subtitle: 'Flowing data out through streams',
        readTimeMinutes: 1,
        coinsOnComplete: 15,
        paragraphs: [
          'C++ introduces the concept of input/output streams via the `<iostream>` header. Instead of formatted functions, C++ provides `std::cout`, which represents the standard character output stream.',
          'We send information into this stream using the stream insertion operator `<<`. Think of `<<` like arrows pushing text and variables straight toward the screen: `std::cout << "Hello C++!" << std::endl;`.',
          'The `std::endl` manipulator inserts a new line and flushes the buffer, ensuring your output appears instantly without delays.'
        ],
        codeSnippet: `#include <iostream>\n\nint main() {\n    std::cout << "Welcome to C++ Streams!" << std::endl;\n    return 0;\n}`,
        keyTakeaway: 'Use std::cout << data << std::endl; to push output cleanly to the console.'
      },
      {
        id: 'cpp-classes',
        title: 'Classes: The Blueprint of Objects',
        subtitle: 'Designing your own custom data types',
        readTimeMinutes: 1,
        coinsOnComplete: 15,
        paragraphs: [
          'In Object-Oriented Programming (OOP), a `class` is like an architectural blueprint for a house, or a character sheet for a video game hero. It defines what attributes (variables) and abilities (functions) an object will have.',
          'To create a blueprint, you use the `class` keyword followed by the class name: `class Robot { public: int battery; };`. Notice the `public:` label—it allows outside code to interact with those attributes.',
          'Crucial C++ syntax tip: a class declaration must ALWAYS end with a closing brace and a semicolon: `};`!'
        ],
        codeSnippet: `class Robot {\npublic:\n    int battery = 100;\n    void speak() {\n        std::cout << "Beep boop!" << std::endl;\n    }\n};`,
        keyTakeaway: 'A class is a blueprint defining variables and functions, declared with class Name { public: ... };'
      },
      {
        id: 'cpp-objects',
        title: 'Instantiating Objects and Method Calls',
        subtitle: 'Bringing blueprints to life with the dot operator',
        readTimeMinutes: 1,
        coinsOnComplete: 15,
        paragraphs: [
          'Once you have defined a class, you can create actual living instances of it called objects! For instance, `Robot bot;` creates a real robot named `bot` right inside memory.',
          'To trigger an action or access a variable on that specific object, we use the member access dot operator `.`. For example, writing `bot.powerUp();` calls the `powerUp` method on `bot`.',
          'You can create dozens of separate robots from the exact same blueprint, and each one can hold its own unique battery level and coordinates!'
        ],
        codeSnippet: `Robot bot;\nbot.battery = 100;\nbot.speak(); // Calls the speak method using the dot operator .`,
        keyTakeaway: 'Create an object using ClassName objectName; and invoke its methods with objectName.method();'
      }
    ]
  },

  python: {
    trackId: 'python',
    trackName: 'Python Basics',
    icon: '🐍',
    color: 'var(--warning)',
    description: 'Clean syntax, dynamic typing, list iterations, and modular function design.',
    topics: [
      {
        id: 'py-print',
        title: 'The Clean Power of print()',
        subtitle: 'Simplicity and readability above all',
        readTimeMinutes: 1,
        coinsOnComplete: 15,
        paragraphs: [
          'Python was designed to look like readable English. You don\'t need boilerplate headers, semicolons, or complicated type declarations. Displaying text is as simple as writing `print("Hello Python!")`.',
          'Python also supports modern formatted string literals called f-strings! Prefix your string with an `f`, and you can insert any variable directly inside curly braces: `print(f"Current Level: {level}")`.',
          'Unlike many languages, Python automatically appends a newline at the end of every `print()` statement, keeping your code wonderfully concise.'
        ],
        codeSnippet: `player = "Cira Explorer"\nlevel = 5\nprint(f"Welcome {player}, you are on Level {level}! 🐍")`,
        keyTakeaway: 'Output anything using print() and format variables inside f"Hello {name}!"'
      },
      {
        id: 'py-loops',
        title: 'Iterating Collections with for Loops',
        subtitle: 'Letting the computer repeat actions for you',
        readTimeMinutes: 1,
        coinsOnComplete: 15,
        paragraphs: [
          'Instead of manually copying code, loops repeat tasks effortlessly. In Python, a `for` loop lets you iterate through every item in a collection, such as a list of strings or numbers.',
          'The syntax is extremely intuitive: `for item in items:`. Notice the colon `:` at the end of the statement! The colon signals to Python that an indented code block is starting.',
          'Python uses indentation (4 spaces) rather than curly braces `{}` to determine which instructions belong inside the loop.'
        ],
        codeSnippet: `spells = ["Sparkle ✨", "Lightning ⚡", "Shield 🛡️"]\nfor spell in spells:\n    print(f"Casting {spell}!")`,
        keyTakeaway: 'Loop through lists with for item in items: and remember indentation represents code blocks.'
      },
      {
        id: 'py-functions',
        title: 'Building Reusable Tools with def',
        subtitle: 'Packaging logic into modular functions',
        readTimeMinutes: 1,
        coinsOnComplete: 15,
        paragraphs: [
          'A function is a reusable machine that takes input parameters, performs calculations or actions, and optionally returns an output result.',
          'In Python, functions are defined using the 3-letter keyword `def` (short for define), followed by the function name, parentheses for arguments, and a colon: `def brew_potion(power):`.',
          'Once a function is defined, you can call it from anywhere in your script as many times as you like, keeping your codebase DRY (Don\'t Repeat Yourself).'
        ],
        codeSnippet: `def brew_potion(power):\n    print(f"🔮 Brewed magical potion with {power} potency!")\n\nbrew_potion(100)`,
        keyTakeaway: 'Define reusable functions using def function_name(params): and invoke them by name.'
      }
    ]
  },

  ai: {
    trackId: 'ai',
    trackName: 'Basics of AI',
    icon: '🧠',
    color: '#9333ea',
    description: 'Generative AI mechanics, prompt engineering, datasets, and neural network parameters.',
    topics: [
      {
        id: 'ai-prompts',
        title: 'Prompt Engineering & System Directives',
        subtitle: 'How to communicate effectively with Large Language Models',
        readTimeMinutes: 1,
        coinsOnComplete: 15,
        paragraphs: [
          'Artificial Intelligence models like Gemini are neural language predictors trained on massive libraries of human knowledge. The message or instruction you provide to steer the model is called a `prompt`.',
          'Prompt engineering is the art and science of providing clear instructions, context, constraints, and examples to get the best possible output from an AI model.',
          'Good prompts define: (1) The role of the AI (e.g. "Act as a friendly coding tutor"), (2) The task, and (3) Formatting rules (e.g. "Keep answer under 3 sentences and use analogies").'
        ],
        codeSnippet: `user_prompt = "Explain gravity to a 10-year old using a trampoline analogy."\nresponse = gemini.generate_content(user_prompt)`,
        keyTakeaway: 'A prompt is the instruction given to an AI model; clear roles and constraints produce the best results.'
      },
      {
        id: 'ai-datasets',
        title: 'Supervised Learning & Training Datasets',
        subtitle: 'Teaching computers through examples instead of rules',
        readTimeMinutes: 1,
        coinsOnComplete: 15,
        paragraphs: [
          'Traditional programming requires humans to write explicit rules for every scenario. In Machine Learning, we flip this approach: we supply thousands of examples with correct answers and let the model discover the rules!',
          'This curated collection of examples is known as the `training dataset`. For instance, to teach an AI to identify pets, we supply thousands of labeled photos of cats and dogs.',
          'The quality and diversity of your dataset determines how smart, fair, and accurate your AI model will become.'
        ],
        codeSnippet: `training_dataset = load_labeled_data("animals_dataset/")\nmodel.train(training_dataset, epochs=10)`,
        keyTakeaway: 'AI models learn patterns from training datasets rather than hand-coded human rules.'
      },
      {
        id: 'ai-weights',
        title: 'Neural Networks & Learnable Weights',
        subtitle: 'The math behind synthetic intelligence',
        readTimeMinutes: 1,
        coinsOnComplete: 15,
        paragraphs: [
          'Modern AI is powered by artificial neural networks inspired by biological brains. A neural network consists of layers of interconnected math nodes called neurons.',
          'Each connection has an adjustable number called a `weight`. When the network makes a mistake during training, an optimization algorithm (like Gradient Descent) slightly adjusts these weights to minimize errors.',
          'State-of-the-art models contain billions or trillions of these weights, working in harmony to translate languages, write code, and compose music.'
        ],
        codeSnippet: `loss = calculate_error(predictions, actual_labels)\nmodel.update_weights(learning_rate=0.01)`,
        keyTakeaway: 'Neural networks learn by fine-tuning billions of internal connection numbers called weights.'
      }
    ]
  }
};
