const mandatoryPopup = ({errorMandatory}) => {

    

  return (
    <>
        <div className="absolute top-0 left-0 h-screen w-screen bg-black  z-20 opacity-100" />
            <div className="absolute top-0 left-0 h-screen w-screen z-30  flex justify-center items-center ">
                <div className="h-2/5 w-3/5 bg-gradient-to-b from-cyan-600 to-blue-900 z-40  flex justify-center items-center rounded-2xl flex-col">
                    <p className="text-white text-xl font-bold">Todos los campos son obligatorios</p>
                    <button
                        className="border rounded-lg shadow-2xl text-base max-w-32 md:h-10 md:max-w-40 bg-green-600 md:mt-10 md:hover:text-green-600 md:hover:bg-white md:hover:border-green-600
                                    transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-75 text-center text-white px-16"
                        onClick={errorMandatory}
                    >
                        Ok
                    </button>
                </div>
            </div>
    </>
  )
}

export default mandatoryPopup