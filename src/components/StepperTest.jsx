export const StepperTest = ({ steps }) => {
  return (
    <ol className="relative text-gray-500 border-s border-gray-200">
      <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full -start-4 ring-4"></span>
        <h3 className="font-medium leading-tight">Personal Info</h3>
        <p className="text-sm">Step details here</p>
      </li>
      <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full -start-4 ring-4"></span>
        <h3 className="font-medium leading-tight">Account Info</h3>
        <p className="text-sm">Step details here</p>
      </li>
      <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full -start-4 ring-4"></span>
        <h3 className="font-medium leading-tight">Review</h3>
        <p className="text-sm">Step details here</p>
      </li>
      <li className="ms-6">
        <span className="absolute flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full -start-4 ring-4"></span>
        <h3 className="font-medium leading-tight">Confirmation</h3>
        <p className="text-sm">Step details here</p>
      </li>
    </ol>

  )
}
