import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Nullable } from "../../utils/sharedModels";
import "./Skills.css";

interface SkillDesc {
    name: string;
    desc: string;
}

interface Skill {
    x: number;
    y: number;
    info: SkillDesc;
    color: string;
    active: boolean;
}

const Skills = () => {
    const skillsCanvas = useRef<HTMLCanvasElement>(null);
    const [skillModal, setSkillModal] = useState<Nullable<Skill>>(null);

    const possibleColors = [
        '#79fa5b',
        '#42b6e2',
        '#efefef',
        '#eb8433',
        '#e03353',
        '#d7d7d7',
    ];

    const possibleSkills: SkillDesc[] = [
        {   
            name: 'JS', 
            desc: `
                Javascript - I frequently build both backends and frontends using 
                Javascript. I have 3+ years of experiencing both building side projects
                and production grade API's and frontends. Although I tend to jump to TypeScript
                more than Javascript for its type safety and extra features, Javsacript is still one 
                of my most heavily used languages.
            `
        },
        {name: 'TS', desc: ''},
        {name: 'Go', desc: ''},
        {name: 'Java', desc: ''},
        {name: 'C++', desc: ''},
        {name: 'C', desc: ''},
        {name: 'APIs', desc: ''},
        {name: 'SQL', desc: ''},
        {name: 'Postgres', desc: ''},
        {name: 'MySQL', desc: ''},
        {name: 'Vue', desc: ''},
        {name: 'React', desc: ''},
        {name: 'Angular', desc: ''},
        {name: 'GinGonic', desc: ''},
        {name: 'Mux', desc: ''},
        {name: 'GraphQL', desc: ''},
        {name: 'RabbitMQ', desc: ''},
        {name: 'NodeJS', desc: ''},
        {name: 'AWS', desc: ''},
        {name: 'CSS', desc: ''},
        {name: 'SCSS', desc: ''},
        {name: 'HTML5', desc: ''},
        {name: 'WebSockets', desc: ''},
        {name: 'REST', desc: ''},
        {name: 'Design', desc: ''},
    ];

    let ctx = skillsCanvas?.current?.getContext('2d');
    const PADDING = 50, RADIUS = 75, PADDING_Y = 70;

    let animationID: number;
    let  x: number, y: number;
    let centerX: number, centerY: number, offsetX: number, offsetY: number;
    let mouseX: number, mouseY: number;

    let skills: Skill[] = [];
    
    const setDefaults = () => {
        ctx = skillsCanvas?.current?.getContext('2d');

        skills = [];

        if (skillsCanvas && skillsCanvas.current) {
            skillsCanvas.current.width = window.innerWidth;
            skillsCanvas.current.height = window.innerHeight;
        }

        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;

        centerX = skillsCanvas?.current?.width! / 2;
        centerY = skillsCanvas?.current?.height! / 2;
    
        y = 0;
        x = 0;
    }

    setDefaults();

    const draw = () => {
        let scale: number, closest: number;

        const getClosest = () => {
            let close = 0, closest = 0, dx: number, dy: number, dist: number;
        
            for (let i = 0; i < skills.length; i++) {
                dx = skills[i].x + offsetX - centerX;
                dy = skills[i].y + offsetY - centerY;
            
                dist = Math.sqrt(dx * dx + dy * dy);
                
                if (!close) {
                    close = dist;
                    closest = i;
                } else if (dist < close) {
                    close = dist;
                    closest = i;
                }
            }

            return closest;
        }
        
        const getDistance = (skill: Skill) => {
            var dx: number, dy: number, dist: number;
            
            dx = skill.x + offsetX - centerX;
            dy = skill.y + offsetY - centerY;
            
            dist = Math.sqrt(dx * dx + dy * dy);
            scale = 1 - (dist / 400);
            scale = scale > 0 ? scale : 0;
            
            return scale;
        }

        const clearPastActiveSkills = (except?: number) => {
            for (let i = 0; i < skills.length; i++) {
                skills[i].active = false;
            }

            if (except) {
                skills[except].active = true;
            }
        };

        clearPastActiveSkills();

        ctx?.clearRect(0, 0, skillsCanvas?.current?.width ?? 0, skillsCanvas?.current?.height ?? 0);
        ctx?.save();

        offsetX = mouseX - centerX;
        offsetY = mouseY - centerY;
        ctx?.translate(offsetX, offsetY);

        closest = getClosest();

        for (let i = 0; i < skills.length; i++) {
            if (ctx) {
                ctx.save();

                scale = getDistance(skills[i]);
                ctx.translate(skills[i].x, skills[i].y);
                ctx.translate(RADIUS / 2, RADIUS/ 2);
                ctx.scale(scale, scale);
                ctx.translate(-RADIUS / 2, -RADIUS/ 2);
                ctx.fillStyle = skills[i].color;

                ctx.beginPath();
                ctx.arc(0, 0, RADIUS, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.closePath();

                if (i === closest) {
                    clearPastActiveSkills(i);

                    ctx.strokeStyle = "white";
                    ctx.lineWidth = 10;
                    ctx.stroke();

                    ctx.font = '20pt Impact';
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(skills[i].info.name, 0, 0);
                }
                
                ctx.restore();
            }
        }  

        ctx?.restore();
        animationID = requestAnimationFrame(draw);
    };

    const handleMouseMovedEvent = (evt: any) => {
        mouseX = evt.layerX + (mouseX / 2);
        mouseY = evt.layerY + (mouseY / 2);
    };

    const handleWindowResizedEvent = () => {
        if (skillsCanvas && skillsCanvas.current) {
            skillsCanvas.current.width = window.innerWidth;
            skillsCanvas.current.height = window.innerHeight;
            centerX = skillsCanvas.current.width / 2;
            centerY = skillsCanvas.current.height / 2;
        }
    };

    const handleCanvasClicked = (evt: any) => {
        if (skillsCanvas && skillsCanvas.current) {
            for (const skill of skills) {
                if (skill.active) {
                    setTimeout(() => setSkillModal(skill), 250);
                }
            }
        }
    };

    const replacePastListeners = () => {
        cancelAnimationFrame(animationID);

        skillsCanvas.current?.removeEventListener('click', handleCanvasClicked);
        document.removeEventListener('mousemove', handleMouseMovedEvent);
        window.removeEventListener('resize', handleWindowResizedEvent);

        skillsCanvas.current?.addEventListener('click', handleCanvasClicked);

        document.addEventListener('mousedown', () => {
            document.addEventListener('mousemove', handleMouseMovedEvent)
        });

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleMouseMovedEvent);
        })

        window.addEventListener('resize', handleWindowResizedEvent);
    }

    const setupCanvas = () => {
        setDefaults();

        if (skillsCanvas.current) {
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    const colorIdx = Math.floor(Math.random() * possibleColors.length);
                    const skillIdx = Math.floor(Math.random() * possibleSkills.length);

                    skills.push({
                        x: x, 
                        y: y, 
                        color: possibleColors[colorIdx],
                        info: possibleSkills[skillIdx],
                        active: false,
                    });

                    x += RADIUS + PADDING;
                }

                if (i % 2 === 0) {
                    x = PADDING;
                } else {
                    x = 0;
                }

                y += PADDING + PADDING_Y;
            }

            replacePastListeners();
            draw();
        }
    };

    const closeSkillModal = () => {
        setSkillModal(null);
    }

    useEffect(() => {
        setupCanvas();
    });
 
    return (
        <div className="has-text-centered">
            <div className="modal-container">
                <div className={skillModal !== null ? "modal modal-fx-fadeInScale is-active" : "modal modal-fx-fadeInScale"}>
                    <div className="modal-background"></div>
                    <div className="modal-content is-huge skills-content">
                        <p className="title">{skillModal?.info.name}</p><hr/>
                        <p className="subtitle">{skillModal?.info.desc}</p>
                    </div>
                    <button onClick={closeSkillModal} className="modal-close is-large" aria-label="close"></button>
                </div>
            </div>
            <div className="skills-container">
                <canvas 
                    id="skills-canvas" 
                    ref={skillsCanvas}
                >    
                </canvas>
            </div>
        </div>
    );
};

export default Skills;
