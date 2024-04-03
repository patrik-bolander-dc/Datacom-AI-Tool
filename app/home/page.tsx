const Home = () => {
    return (
        <div className="flex justify-center ">
            <div className="">
                <h1 className="font-bold text-4xl text-gray-700 dark:text-slate-100">Welcome to the Home page</h1>

                <h3 className="mt-4">the current tech stack for this platform:</h3>
                <ul className="list-disc ml-5">
                    <li>NextJs</li>
                    <li>Typescript</li>
                    <li>Tailwind CSS</li>
                    <li>Shadcn/ui CSS components</li>
                </ul>

            </div>
        </div>
    );
}

export default Home;