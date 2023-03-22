import * as C from './styles';


type Props = {
  title: string;
  value: number;
  color?: string;
}

const ResumeItem = ({title, value, color}: Props) => {

  return (
    <C.Container>
        <C.Title>{title}</C.Title>
        <C.Info color={value < 0 ? 'red' : 'green'}>R$ {value}</C.Info>
    </C.Container>
  )
}

export default ResumeItem