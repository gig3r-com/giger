import { mockGigs } from "../../../mocks/gigs"
import { GigCategoryNames, IGig } from "../../../models/gig";

export class GigListService {
    /**
     * mocked data for now
      */
    getGigs(): IGig[] {
        return mockGigs;
    }

    filterGigsByCategories(categories: GigCategoryNames[]): IGig[] {
        return mockGigs.filter(gig => categories.includes(gig.category));
    }
}
