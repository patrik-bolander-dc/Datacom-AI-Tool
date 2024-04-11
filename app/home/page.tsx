const Home = () => {
    return (
        <div className="flex justify-center ">
            <div className="">
                <h1 className="font-bold text-4xl text-gray-700 dark:text-slate-100">Welcome to the Home page</h1>

                <h3 className="mt-4 font-semibold">the current tech stack for this platform:</h3>
                <ul className="list-disc ml-5">
                    <li>NextJs</li>
                    <li>Typescript</li>
                    <li>Tailwind CSS</li>
                    <li>Tailwind CSS Merge</li>
                    <li>Tailwind CSS animation</li>
                    <li>Shadcn/ui CSS components</li>
                    <li>Lucide-react icons</li>
                </ul>

                <h1 className="mt-4 font-semibold">TODO / Next steps:</h1>
                <ul className="list-disc ml-5">
                    <li>Implement Azure AD auth</li>
                    <li>Host this application on AWS Amplify</li>
                </ul>
            </div>
        </div>
    );
}

export default Home;