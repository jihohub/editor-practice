import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="col-span-2 md:col-span-3 lg:col-span-5 w-[100vw] h-[100vh] flex justify-center items-center">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible
      />
    </div>
  );
};

export default Loader;
