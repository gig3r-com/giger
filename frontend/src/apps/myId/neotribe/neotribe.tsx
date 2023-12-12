import { FC } from 'react';
import { IUser } from '../../../models/user';
import './neotribe.scss';

export type NeotribeProps = {
    user: IUser | undefined;
};

export const Neotribe: FC<NeotribeProps> = ({ user }) => {
    return (
        <section className="neotribe">
            <h1>{user?.name}</h1>
            <span>{descriptionMock}</span>
        </section>
    );
};

const descriptionMock = `Stosunek Takayamy do:
transhumanizmu: zdystansowany - każdy wszczep to dowód porażki, jednocześnie każdy wszczep zaznaczany jest kintsugi; wpływanie na emocje za pomocą ziół, czystej medytacji itd, ale też taniocha w postaci psychotropów

wszczepy: użytkowo - im więcej wszczepów, tym niżej w hierarchii

androidy: hell no - to tylko narzędzia - robotyzacja to proces przemysłowy

czystości ludzkiego organizmu: jako jedna z najwyższych wartości + duch -> im większa robotyzacja, tym słabszy duch, dlatego oddalają się od człowieczeństwa

systemu korporacyjnego: hell yeah

handel ciałem/organami: hodowla organów - tylko dla wybranych (medycyna), wszczepy dostępne, ale zmniejszają człowieczeństwo, nielegalne organy - niesankcjonowane, ale nie wykrywane przez skanery, ale jak się rypnie, to ryzykuje się wszystkim - wytrych dla innych organizacji
istnienie rządów: hierarchia tak, ale są niepotrzebne i nieefektywne
używki: naturalne (oficjalnie), sztuczne dla mas
Giger: Takayama zagląda, ale nie używa - załatw to za nas`;
