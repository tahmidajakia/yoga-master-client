import Gallary from "./home/Gallary/Gallary";
import HeroContainer from "./home/hero/HeroContainer";
import Map from "./home/map/Map";
import PopularClasses from "./home/PopularClasses/PopularClasses";
import PopularTeachers from "./home/PopularTeachers/PopularTeachers";
import TimingOfYoga from "./home/TimingOfYoga";


const Home = () => {
    return (
        <section>
            <HeroContainer></HeroContainer>
            <div className="max-w-screen-xl mx-auto">
              <Gallary></Gallary>
              <PopularClasses></PopularClasses>
              <TimingOfYoga></TimingOfYoga>
              <PopularTeachers></PopularTeachers>
            </div>
            <Map></Map>
        </section>
    );
};

export default Home;