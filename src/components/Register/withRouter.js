import { useNavigate } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};
//Não se podem usar jooks dentro de uma class componet, por isso se utiliza esse Wrapper para ao componente de classe 
//O Wrapper devolve para a classe os hooks de Navigate de forma que a classe possa utilizá-los 