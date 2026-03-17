const fs = require("fs");
const path = require("path");

const SKILLS_DIR = path.resolve(__dirname, "../../skills");

const skills = ["play", "quincy", "studio", "vibe"];

function loadSkill(name) {
  const skillPath = path.join(SKILLS_DIR, name, "SKILL.md");
  if (fs.existsSync(skillPath)) {
    return fs.readFileSync(skillPath, "utf-8");
  }
  return null;
}

module.exports = {
  name: "quincy-claw",
  description: "AI music production skills for Strudel live coding",
  skills: skills.map((name) => ({
    name,
    content: loadSkill(name),
  })),
};
