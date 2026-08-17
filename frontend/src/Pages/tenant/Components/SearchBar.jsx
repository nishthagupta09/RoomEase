import {
    Search,
    MapPin,
    Users,
    IndianRupee,
    RotateCcw
} from "lucide-react";
import * as Slider from "@radix-ui/react-slider";

const SearchBar = ({
    searchRequest,
    setSearchRequest,
    handleSearch,
    clearFilters
}) => {

    const MIN_RENT = 2000;
    const MAX_RENT = 50000;
    const STEP = 500;

    const sliderValue = [
        searchRequest.minRent ?? MIN_RENT,
        searchRequest.maxRent ?? MAX_RENT
    ];

    return (

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-10">

            <div className="flex gap-5">

                <div className="relative flex-1">

                    <Search
                        className="absolute left-5 top-1/2 -translate-y-1/2
                       h-5 w-5 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search PG, city or locality..."
                        value={searchRequest.keyword}
                        onChange={(e) =>
                            setSearchRequest({
                                ...searchRequest,
                                keyword: e.target.value
                            })
                        }
                        className="w-full rounded-2xl border border-gray-300 pl-14 pr-5 py-4 text-lg focus:ring-2 focus:ring-blue-500 outline-none"/>

                </div>

                <button
                    onClick={handleSearch}
                    className="px-10 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition">
                    Search
                </button>

            </div>

            <div className="h-px bg-gray-200 my-8"/>

            <div className="grid grid-cols-12 gap-8">

                <div className="col-span-5">

                    <label
                        className="flex items-center gap-2 text-gray-700 font-medium mb-3"
                    >
                        <MapPin className="h-4 w-4" />
                        City
                    </label>

                    <select
                        value={searchRequest.city}
                        onChange={(e) =>
                            setSearchRequest({
                                ...searchRequest,
                                city: e.target.value
                            })
                        }
                        className=" w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500">

                        <option value="">All Cities</option>
                        <option value="New Delhi">New Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Noida">Noida</option>

                    </select>

                </div>

                <div className="col-span-5">

                    <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
                        <Users className="h-4 w-4" />
                        Gender
                    </label>

                    <select
                        value={searchRequest.genderType ?? ""}
                        onChange={(e) =>
                            setSearchRequest({
                                ...searchRequest,
                                genderType:
                                    e.target.value === ""
                                        ? null
                                        : e.target.value
                            })
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500" >

                        <option value="">All</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="UNISEX">Unisex</option>
                    </select>

                </div>

                <div className=" col-span-2 flex items-end justify-end">

                    <button
                        onClick={clearFilters}
                        className=" flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 hover:bg-gray-100 transition">

                        <RotateCcw className="h-4 w-4" />
                        Reset
                    </button>

                </div>

            </div>

            <div className="mt-10">

                <div className="flex items-center gap-2 mb-4">

                    <IndianRupee
                        className="h-5 w-5 text-green-600"
                    />

                    <span className="font-medium">
                        Rent Range
                    </span>

                </div>

                <div  className="flex justify-between text-sm text-gray-500 mb-3">

                    <span>

                        ₹{sliderValue[0].toLocaleString()}

                    </span>

                    <span>

                        ₹{sliderValue[1].toLocaleString()}

                    </span>

                </div>

                <Slider.Root
                    value={sliderValue}
                    min={2000}
                    max={50000}
                    step={500}
                    onValueChange={(value) =>
                        setSearchRequest({
                            ...searchRequest,
                            minRent: value[0],
                            maxRent: value[1]
                        })
                    }
                    className="relative flex items-center w-full h-6">

                    <Slider.Track className=" relative h-2 grow rounded-full bg-gray-200">

                        <Slider.Range className=" absolute h-full rounded-full bg-emerald-600"/>

                    </Slider.Track>

                    <Slider.Thumb className="block h-7 w-7 appearance-none rounded-full bg-white border-[3px] border-emerald-500 shadow-md cursor-pointer outline-none hover:scale-105 transition-all focus:ring-4 focus:ring-emerald-200"/>

                    <Slider.Thumb className="block h-7 w-7 appearance-none rounded-full bg-white border-[3px] border-emerald-500 shadow-md cursor-pointer outline-none hover:scale-105 transition-all focus:ring-4 focus:ring-emerald-200"/>

                </Slider.Root>

            </div> 

        </div>      

    );

};

export default SearchBar;