
import React, { useState, PureComponent } from 'react';
import styles from './cardtrintadias.module.css';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const RADIAN = Math.PI / 180;
const data = [
    { name: 'Bom', value: 1, color: '#00C4B4' },
    { name: 'Moderado', value: 1, color: '#FEC601' },
    { name: 'Ruim', value: 1, color: '#FF4E42' },
];
const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;
const value = 50;

const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
        total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
        <circle key="needle-circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
        <path
            key="needle-path"
            d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
            stroke="none"
            fill={color}
        />,
    ];
};


const data2 = [
    {
        subject: 'Dificuldade pra Dormir',
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        subject: 'Cansaço ao acordar',
        A: 98,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'Sonolência Diurna',
        A: 86,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'Uso de telas',
        A: 99,
        B: 100,
        fullMark: 150,
    },
    {
        subject: 'Qualidade do sono',
        A: 85,
        B: 90,
        fullMark: 150,
    },
    {
        subject: 'Estresse diário',
        A: 65,
        B: 85,
        fullMark: 150,
    },
];



const Cardtrintadias = () => {
    return (
        <div className={styles.carRelRelatorio}>
            <div className={styles.cardRel}>
                <div className={styles.cardGraficoUm} style={{ width: 600, height: 400 }}>

                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data2}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} />
                            <Radar name="Hoje" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            <Radar name="Semana" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                            <Tooltip />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <div className={styles.cardGraficoDois}>
                    <h2>Uso de tela antes de dormir</h2>
                    <PieChart width={250} height={150}>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={data}
                            cx={125}
                            cy={130}
                            innerRadius={60}
                            outerRadius={80}
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        {needle(value, data, 125, 130, 60, 80, "#000")}
                    </PieChart>
                    <h2>Moderado</h2>
                </div>
            </div>
            <div className={styles.cardRelDescricao}>
                <h1>Relatório dos últimos 30 dias</h1>
                <p>Este relatório apresenta uma visão geral do seu bem-estar nos últimos 7 dias, com foco em aspectos como qualidade do sono, uso de telas antes de dormir e níveis de estresse.</p>
                <p>Os gráficos mostram a evolução dos seus hábitos e sentimentos, ajudando você a identificar padrões e áreas que podem ser melhoradas.</p>
                <p>Use essas informações para ajustar sua rotina e promover um sono mais saudável e reparador.</p>
            </div>
        </div>
    );
};

export default Cardtrintadias;