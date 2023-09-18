type DashBoardCardProps = {
  cardName: string
  mainInfo: string
  className: string
  to: string
  children?: React.ReactNode
}

const DashBoardCard = (props: DashBoardCardProps) => {
  const { cardName, mainInfo, className, to, children } = props
  return (
    <a
      href={to}
      className={`${className} dashboard-card p-10 cursor-pointer rounded-lg hover:shadow-2xl hover:shadow-zinc-300 w-auto border`}
    >
      {children}
      <p className="text mt-2">{cardName}</p>
      <p className="text-4xl mt-3 text-black font-700 text-end  uppercase">
        {mainInfo}
      </p>
    </a>
  )
}

export default DashBoardCard
