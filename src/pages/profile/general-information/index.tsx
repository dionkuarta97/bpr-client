import useController from './libs/useController';

const GeneralInformation = () => {
  const { data } = useController();
  console.log(data);
  return <div>GeneralInformation</div>;
};

export default GeneralInformation;
