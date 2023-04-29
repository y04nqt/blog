const CenteredWrapper = ({ children }:{children: JSX.Element}) => {
    return (
        <div className="absolute flex justify-center px-10 left-[230px] w-[calc(100%-230px-5rem)] h-[calc(100%-61px)] items-center shadow-inner">
            {children}
        </div>
    )
}

export default CenteredWrapper;