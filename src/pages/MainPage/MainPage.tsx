import React, {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import Carousel from "../../components/Carousel/Carousel";
import BlockCategories from "../../components/BlockCategories/BlockCategories";

const MainPage: FC = () => {
    return (
        <>
            <Wrapper>
                <Carousel/>
                <BlockCategories isPopularCategories/>
            </Wrapper>
        </>
    )
}
export default MainPage