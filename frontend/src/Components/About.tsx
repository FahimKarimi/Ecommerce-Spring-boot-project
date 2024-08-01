const About = () => {
    return (
        <div className="shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium">
                    About Developer
                </h3>
                <p className="mt-1 max-w-2xl text-sm">
                    Details and informations about developer.
                </p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium ">
                            Full name
                        </dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                            Mohamad Reza
                        </dd>
                    </div>
                    <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium ">
                            Best techno
                        </dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                            React JS
                        </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium">
                            Email address
                        </dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                            mohamadrezamohamadi.1155@gmail.com
                        </dd>
                    </div>
                    <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium">
                            Salary
                        </dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                            $700
                        </dd>
                    </div>
                    <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium ">
                            About
                        </dt>
                        <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                            I am a ReactJS developer with 6 months of experience,
                            also, I familiar with the React library
                            ecosystem and its associated tools such as Redux, Webpack, and Babel 12.
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default About;