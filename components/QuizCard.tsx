import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { SiJavascript, SiMongodb, SiReact, SiVuedotjs, SiPrisma, SiLaravel, SiJquery } from 'react-icons/si';
import { TbBrandNextjs, TbBrandPython, TbBrandMysql } from 'react-icons/tb';
import { FaPhp, FaNodeJs } from 'react-icons/fa';
import Rating from '@mui/material/Rating';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

interface QuizCardProps {
  data: Record<string, any>;
}

const QuizCard: React.FC<QuizCardProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  let Img = SiMongodb;
  let col = 'black';
  let level = data?.level === 'Beginner' ? 2 : data?.level === 'Medium' ? 3 : data?.level === 'Advanced' ? 5 : 0;

  switch (data?.thumbnailUrl) {
    case 'js':
      Img = SiJavascript;
      col = 'yellow';
      break;
    case 'mdb':
      Img = SiMongodb;
      col = 'lightgreen';
      break;
    case 'react':
      Img = SiReact;
      col = 'lightblue';
      break;
    case 'next':
      Img = TbBrandNextjs;
      col = 'black';
      break;
    case 'vue':
      Img = SiVuedotjs;
      col = 'lightgreen';
      break;
    case 'prisma':
      Img = SiPrisma;
      col = 'black';
      break;
    case 'python':
      Img = TbBrandPython;
      col = 'black';
      break;
    case 'php':
      Img = FaPhp;
      col = 'black';
      break;
    case 'msql':
      Img = TbBrandMysql;
      col = 'black';
      break;
    case 'laravel':
      Img = SiLaravel;
      col = 'black';
      break;
    case 'jquery':
      Img = SiJquery;
      col = 'black';
      break;
      case 'node':
      Img = FaNodeJs;
      col = 'black';
      break;

    default:
      break;
  }

  return (
    <HtmlTooltip 
      enterDelay={500}
      title={
        <React.Fragment>
          <Typography color='inherit' className='font-bold'>
            {data.title}
          </Typography>
          {data?.description}
        </React.Fragment>
      }
    >
      <div
        key={data?.id}
        onClick={() => {
          router.push(`/startQuiz/${data?.id}`);
          setIsLoading(true);
        }}
        className='w-[250px]  md:w-[300px] lg:w-[300px]  group text-xl flex flex-col gap-8 shadow-md p-4 bg-white text-zinc-800 rounded-md cursor-pointer hover:shadow-lg transition transform hover:scale-110'
      >
        <div className='font-semibold text-xl self-end gap-2 overflow-hidden'>
          <Img className='absolute top-2 left-2' size={50} color={'#ff5722'} /> {data?.title}
        </div>
        <div className='flex flex-col gap-1 self-start'>
          <Rating name='read-only' size='small' value={level} readOnly />
          <div className='text-xs font-normal'>{data?.level}</div>
        </div>
        <div className='absolute right-4 bottom-4 text-xs text-right w-full'>25 questions</div>
        {isLoading && (
          <div className='absolute left-[45%] top-[35%] text-[#ff5722]'>
            <CircularProgress thickness={7} color='inherit' size={34} />
          </div>
        )}
      </div>
    </HtmlTooltip>
  );
};

export default QuizCard;
