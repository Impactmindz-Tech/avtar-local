
export default function InstantCashCard({title,subTitle,titlePrice,subTitlePrice}) {
  return (
    <div className="flex justify-between my-2 items-center">
    <div className="left">
      <h1 className="text-grey-900">{title}</h1>
    <p className="text-grey-800">{subTitle}</p>
    </div>
    <div className="text-right">
    <h1 className="text-grey-900">{titlePrice}</h1>
    <p className="text-grey-800">{subTitlePrice}</p>
    </div>
  </div>
  )
}
