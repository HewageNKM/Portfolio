// @flow
import * as React from 'react';
import {BentoGrid, BentoGridItem} from "./ui/BentoGrid";
import {gridItems} from "../data";

type Props = {

};
export const Grid = (props: Props) => {
    return (
        <section id="about">
            <BentoGrid>
                {gridItems.map(({id,title,img,className, imgClassName, spareImg, description,titleClassName}) => (
                    <BentoGridItem
                        id={id}
                        key={id}
                        title={title}
                        description={description}
                        className={className}
                        img={img}
                        imgClassName={imgClassName}
                        titleClassName={titleClassName}
                        spareImg={spareImg}
                    />
                    ))}
            </BentoGrid>
        </section>
    );
};