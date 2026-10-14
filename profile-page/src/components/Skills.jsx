import skillsData from "../data/skillsData";
import SkillItem from "./SkillItem";

function Skills() {
    return (
        <section>
            <h2>Skills</h2>
            <ul className="skills-list">
                {skillsData.map((skill) => (
                    <SkillItem key={skill.id} skill={skill} />
                ))}
            </ul>
        </section>
    );
}

export default Skills;