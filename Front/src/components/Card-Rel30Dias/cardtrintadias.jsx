import React, { useState, PureComponent, useEffect } from 'react';
import styles from './cardtrintadias.module.css';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import Cookies from 'js-cookie';
import { thirtyReport, allReport } from '../../middleware/auth';

const RADIAN = Math.PI / 180;
const data = [
    { name: 'Qualidade positiva', value: 33.33, color: '#00C4B4', label: 'Qualidade positiva' },
    { name: 'Pode melhorar', value: 33.33, color: '#FEC601', label: 'Pode melhorar' },
    { name: 'Requer atenção', value: 33.34, color: '#FF4E42', label: 'Requer atenção' },
];

const escalaNormal = {
    'nunca': 0,
    'raramente': 1,
    'algumas_vezes': 2,
    'frequentemente': 3,
    'quase_sempre': 4
};

const escalaInvertida = {
    'sempre': 0,
    'algumas_vezes': 1,
    'raramente': 2,
    'nunca': 3
};

const getPercentual = (valor, invertido) => {
    const base = invertido ? escalaInvertida : escalaNormal;
    const pontuacao = base[valor.toLowerCase()] ?? 0;
    return (pontuacao / 4) * 100;
};

const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
        total += v.value;
    });
    const ang = 180.0 * (value / total);
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
    const [radarData, setRadarData] = useState(data2);
    const [pieValue, setPieValue] = useState(0);
    const [temRelatorio, setTemRelatorio] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = Cookies.get('Id');
                const response = await thirtyReport(id);
                const allResponse = await allReport(id);
                const reponses = allResponse.relatorios;
                const relatorio = response.relatorios;
                const dificuldade = getPercentual(relatorio.dificuldadeParaDormir);
                const cansaço = getPercentual(relatorio.cansacoAoAcordar, true);
                const sonolencia = getPercentual(relatorio.sonolenciaDiurna, true);
                const usoTelas = getPercentual(relatorio.usoDeTelasAntesDeDormir);

                const qualidadeSono = Math.min((parseFloat(relatorio.mediaSono) / 8) * 100, 100);

                const novosDados = [
                    {
                        subject: 'Dificuldade pra Dormir',
                        A: dificuldade,
                        B: 130,
                        fullMark: 100,
                    },
                    {
                        subject: 'Cansaço ao acordar',
                        A: cansaço,
                        B: 100,
                        fullMark: 100,
                    },
                    {
                        subject: 'Sonolência Diurna',
                        A: sonolencia,
                        B: 100,
                        fullMark: 100,
                    },
                    {
                        subject: 'Uso de telas',
                        A: usoTelas,
                        B: 100,
                        fullMark: 100,
                    },
                    {
                        subject: 'Qualidade do sono',
                        A: qualidadeSono,
                        B: 100,
                        fullMark: 100,
                    }
                ];

                 if (response && response.relatorios && Array.isArray(reponses) && reponses.length >= 30) {
                    setTemRelatorio(true);
                } else {
                    setTemRelatorio(false);
                }
                setRadarData(relatorio);
                setPieValue(parseInt(relatorio.regularidadeRotina.replace('%', '')));
            } catch (error) {
                console.error('Erro ao buscar dados do relatório:', error);
                setTemRelatorio(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.carRelRelatorio}>
            {temRelatorio ? (
                <>
                    <div className={styles.cardRel}>
                        <div className={styles.cardGraficoUm} style={{ width: 600, height: 400 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis />
                                    <Radar name="Relatório" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                    <Legend />
                                    <Tooltip formatter={(value) => `${value.toFixed(0)}%`} />
                                </RadarChart>
                            </ResponsiveContainer>

                        </div>
                        <div className={styles.cardGraficoDois}>
                            <h2>Regularidade de rotina</h2>
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
                                {needle((pieValue / 100) * 100, data, 125, 130, 60, 80, "#000")}
                                <Tooltip />

                            </PieChart>

                        </div>
                    </div>
                    <div className={styles.cardRelDescricao}>
                        <h1>Relatório dos últimos 30 dias</h1>
                        <p>Este relatório apresenta uma visão geral do seu bem-estar nos últimos 30 dias, com foco em aspectos como qualidade do sono, uso de telas antes de dormir e níveis de estresse.</p>
                        <p>Os gráficos mostram a evolução dos seus hábitos e sentimentos, ajudando você a identificar padrões e áreas que podem ser melhoradas.</p>
                        <p>Use essas informações para ajustar sua rotina e promover um sono mais saudável e reparador.</p>
                        <p>Como é calculado: sua nota final é baseada em uma média ponderada de fatores como regularidade de sono, tempo de tela antes de dormir e humor relatado. Por exemplo, uma pontuação de 50% indica que há equilíbrio em alguns hábitos, mas ainda há espaço para melhorias — já uma pontuação abaixo de 30% sinaliza atenção urgente em vários pontos.</p>
                    </div>

                </>
            ) : (
                <div className={styles.cardRelSemRelatorio}>
                    <h1>Você ainda não possui um relatório dos últimos 30 dias</h1>
                    <p>Para gerar um relatório, é necessário responder a autoavaliação.</p>
                    <p>Matenha uma ofensiva de 30 dias, para que você consiga visualizar esta funcionalidade.</p>
                </div>
            )}
        </div>
    );
};

export default Cardtrintadias;