import logo from "../../assets/img/logo.png";

const CustomGeneralLoader = () => {
  return (
    <main className="relative">
      <div className="container">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
        <img src={logo} alt="Pentegrasyon_logo" className="size-6" />
      </div>

      <style>
        {`
          .container {
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 50%;
            height: 96px;
            width: 96px;
            animation: rotate_3922 1.2s linear infinite;
            background-color: #9b59b6;
            background-image: linear-gradient(#9b59b6, #84cdfa, #5ad1cd);
          }

          .container span {
            position: absolute;
            border-radius: 50%;
            height: 100%;
            width: 100%;
            background-color: #9b59b6;
            background-image: linear-gradient(#9b59b6, #84cdfa, #5ad1cd);
          }

          .container span:nth-of-type(1) {
            filter: blur(5px);
          }

          .container span:nth-of-type(2) {
            filter: blur(10px);
          }

          .container span:nth-of-type(3) {
            filter: blur(25px);
          }

          .container span:nth-of-type(4) {
            filter: blur(50px);
          }

          .container::after {
            content: "";
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            background-color: #fff;
            border: solid 5px #ffffff;
            border-radius: 50%;
          }

          @keyframes rotate_3922 {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }

            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
        `}
      </style>
    </main>
  );
};

export default CustomGeneralLoader;
