const CenteredWrapper = ({ children, leftCalc = "left-[0] sm:left-[330px]", widthCalc = "w-auto sm:w-[calc(100%-330px-5rem)]" }:{children: JSX.Element; leftCalc?: string; widthCalc?: string;}) => {
    return (
        <div className={`absolute flex justify-center px-10 ${leftCalc} ${widthCalc} h-[calc(100%-61px)] items-center shadow-inner`}>
            {children}
        </div>
    )
}

export default CenteredWrapper;