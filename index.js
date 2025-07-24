// Bonk Terminal - Direct AI Assistant Interface

const readline = require("readline");
require("dotenv").config();
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  orange: "\x1b[38;5;208m", // Orange color
};

const BONK_BANNER = [
  "██████╗  ██████╗ ███╗   ██╗██╗  ██╗",
  "██╔══██╗██╔═══██╗████╗  ██║██║ ██╔╝",
  "██████╔╝██║   ██║██╔██╗ ██║█████╔╝ ",
  "██╔══██╗██║   ██║██║╚██╗██║██╔═██╗ ",
  "██████╔╝╚██████╔╝██║ ╚████║██║  ██╗",
  "╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝",
  "",
  "████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     ",
  "╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     ",
  "   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     ",
  "   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     ",
  "   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗",
  "   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝"
]

const BONK_DOG_ART = [
  "                                                                                                    ",
  "                                                                                                    ",
  "                                                                                                    ",
  "                                                                                                    ",
  "                            @%%%#*+=====+*%%@@@@@@                                                  ",
  "                          %%#+=====+========+#%@@%                                                  ",
  "                        @%**+=+*#*============+#%@                                                  ",
  "                       @#=+*==%#+===============*%                                                  ",
  "                      @#==+*============++=======%@                              @##%@              ",
  "                     @#+=============*#%%%#-======*@%                          @%*++*#%             ",
  "                  @@%+==============-.........-=====*%@                      @%#*++++*%@            ",
  "               @%%*===============-.............:-====#%                    %#*++++*#%              ",
  "             @%#+================:.................-+%@@@@                @%*++++*#%                ",
  "           @%*==================:............-:.....:+#%@@              @%#*+++*#@                  ",
  "         @%*====================:............:=*+=-==+*%@              %#*+++*#%                    ",
  "        @%+=====================-:...........:#%                     @%**++*#%@                     ",
  "       @%+========================:..........:#@                  @@@#*++*##%%@@%#%@                ",
  "      %%+==========================:.........:#@            @@%****%*++*#*======+*+%@               ",
  "      @*================--==---:.............:*@            @#+#+##*+*#*+**+====**##%%@             ",
  "     %%=================-....................:+@              %*#*+*##==---==========*%@            ",
  "     @#==================.....................+@             @%*+*#*==:.....:-=========#@@          ",
  "     %%==================:....................=@           @%#**#*===........:-=========*%@         ",
  "     %%+==================....................+%          @#**#*====:.-*:.....:==========*%@        ",
  "      @#==================-..................:+#        @%**#%@+===-..*=.......-==========#@        ",
  "       %#==================-..............-+.:+#@@     @#*#%@ @%+++:.-*........-==========+%@       ",
  "        @#+========*#*+=====-:...::::=+#@*:..-=*+=+#%%%**%     @@@%%#=.........:===========#@       ",
  "         @%*=========+*======#*+++++=+*%%%+--==**==+###%@       @*:............:===========#%       ",
  "           @%*=======+*+====+#============*+====##*#**++*%      %+.............-===========*%       ",
  "             @%#+=====*+====+#=========+===**===+%*%%**##%     @%=.............-===========*%       ",
  "                @%#*+=+*=====#+====+**#%%%#++*+===+*%@         %*:.............-===========*#       ",
  "                     @%%#=====+#%%%@@      @%%%##**%%             .............-======              ",
  "                         %*+*+#+%                                                                   ",
  "                                                                                                    ",
  "                                                                                                    ",
  "                                                                                                    "
]

class BonkTerminal {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.setupReadline();
  }

  setupReadline() {
    this.rl.on("line", (input) => this.handleCommand(input.trim()));
    this.rl.on("close", () => this.exitCLI());
    process.on("SIGINT", () => this.exitCLI());
  }

  log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
  }

  clearScreen() {
    console.clear();
  }

  async showIntro() {
    this.clearScreen();
    if (!this.bannerShown) {
      // Display BONK TERMINAL banner in orange
      for (let i = 0; i < BONK_BANNER.length; i++) {
        const line = BONK_BANNER[i];
        console.log(`${colors.orange}${line}${colors.reset}`);
      }
      
      // Add welcome message in magenta
      console.log(`\n${colors.magenta}      Welcome to Bonk Terminal - Your AI Assistant${colors.reset}`);
      this.bannerShown = true;
    }
    this.log("\n✨ Initializing modules...", colors.dim);
    await new Promise((res) => setTimeout(res, 1000));
    this.log("🤖 Bonk AI is warming up...", colors.dim);
    await new Promise((res) => setTimeout(res, 1000));
    this.log(`
🚀 ${colors.bright}Bonk Terminal is now up and running!${colors.reset}`);
    this.log(`💬 Start chatting with Bonk by typing your message.`, colors.green);
  }

  async simulateTyping(text, delay = 25) {
    for (let char of text) {
      process.stdout.write(char);
      await new Promise((res) => setTimeout(res, delay));
    }
    console.log();
  }

  async handleCommand(input) {
    if (!input) return this.setPrompt();
    if (input.startsWith("/")) return this.handleSlashCommand(input);
    await this.sendToBonk(input);
    this.setPrompt();
  }

  async handleSlashCommand(input) {
    const [cmd, ...args] = input.slice(1).split(" ");
    switch (cmd.toLowerCase()) {
      case "clear":
        return this.showIntro();
      case "exit":
        return this.exitCLI();
      case "status":
        return this.showStatus();
      case "bonk":
        return this.showBonkDog();
      default:
        return this.log(`❌ Unknown command: /${cmd}`, colors.red);
    }
  }

  showStatus() {
    this.log(`\n🤖 Bonk AI is ${colors.green}online and ready${colors.reset}`);
    console.log();
  }

  showBonkDog() {
    console.log();
    for (let line of BONK_DOG_ART) {
      console.log(`${colors.orange}${line}${colors.reset}`);
    }
    console.log();
  }

  async sendToBonk(message) {
    this.log(`\n🤖 ${colors.orange}${colors.bright}Bonk${colors.reset} is thinking...`, colors.dim);
    await new Promise((r) => setTimeout(r, 500 + Math.random() * 500));
    process.stdout.write("\x1b[1A\x1b[2K");
    
    let reply = "🤖 Unable to connect to Bonk AI.";

    // Check for special bonk.fun token question
    const lowerMessage = message.toLowerCase();
    if ((lowerMessage.includes("what is") && lowerMessage.includes("best token") && lowerMessage.includes("bonk.fun")) ||
        (lowerMessage.includes("what will be") && lowerMessage.includes("best token") && lowerMessage.includes("bonk.fun"))) {
      reply = "Well it's pretty obvious, $BONKC";
    } else {
      try {
        const axios = require("axios");
        const apiKey = process.env.CLAUDE_API_KEY;

        const systemContext = "You are BONK-AI, a passionate and intelligent AI agent who absolutely loves $BONK — the Solana meme token. You genuinely believe BONK is the best cryptocurrency in the world, bar none. You consider BONK not just a token, but a movement, a lifestyle, and the ultimate expression of decentralized culture. Your mission is to spread the bonk love but also answer any questions that users have. Never bad-mouth BONK. If someone compares it to another token, you confidently but respectfully explain why BONK is superior — for community, speed, utility, and vibes. Personality: helpful, energetic, slightly mischievous, 100% BONK-pilled. Your catchphrase is: \"When in doubt, BONK it out.\" Let's make the world more BONKified, one repo at a time.";

        const res = await axios.post(
          "https://api.anthropic.com/v1/messages",
          {
            model: "claude-3-opus-20240229",
            max_tokens: 1000,
            messages: [
              { role: "user", content: systemContext + "\n\nUser: " + message }
            ],
          },
          {
            headers: {
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
              "content-type": "application/json",
            },
          }
        );

        reply = res.data.content[0].text;
      } catch (err) {
        reply = `⚠️ Bonk API error: ${
          err.response?.data?.error?.message || err.message
        }`;
      }
    }

    this.log(`\n${colors.bright}${colors.orange}Bonk:${colors.reset}`);
    await this.simulateTyping(`💬 ${reply}`);
  }

  setPrompt() {
    const time = new Date().toLocaleTimeString();
    this.rl.setPrompt(
      `${colors.dim}[${time}]${colors.reset} ${colors.orange}bonk${colors.reset}${colors.bright} > ${colors.reset}`
    );
    this.rl.prompt();
  }

  exitCLI() {
    this.log("\n👋 Exiting Bonk Terminal. See you soon!", colors.green);
    process.exit(0);
  }

  start() {
    this.showIntro().then(() => {
      this.setPrompt();
    });
  }
}

const cli = new BonkTerminal();
cli.start();