import { Hexagon } from './hexagon/hexagon';

import './giger.scss';
import { IGigCategory } from '../../models/gig';
import { useState } from 'react';
import { categoriesByRows } from './categories';
import { AnimatePresence } from 'framer-motion';
import { BigButton } from '../../shared/big-button/big-button';
// import { ShaderPrecision } from '../../shared/shader-bg/shader.types';
// import { ShaderBG } from '../../shared/shader-bg/shaderBg';
// import { blackFlower } from '../../shared/shader-bg/shaders/blackFlower/blackFlower';

export const Giger = () => {
    const [selectedCategories, setSelectedCategories] = useState<
        IGigCategory[]
    >([]);

    const handleCategoryClick = (category: IGigCategory) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((c) => c !== category)
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <section className='giger'>
            {/* <ShaderBG shader={blackFlower(ShaderPrecision.low)} /> */}
            {categoriesByRows.map((categoryRow, index) => (
                <div className="giger__filter-row" key={`catRow${index}`}>
                    {categoryRow.map((category, catIndex) => (
                        <AnimatePresence>
                            <Hexagon
                                key={category.type}
                                select={handleCategoryClick}
                                category={category}
                                delayMultiplier={catIndex}
                            />
                        </AnimatePresence>
                    ))}
                </div>
            ))}

            <BigButton text="SAVE" onClick={() => {}} />
        </section>
    );
};
