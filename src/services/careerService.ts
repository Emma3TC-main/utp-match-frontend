import { careers } from "../data/demo";
import { apiClient } from "../lib/apiClient";
import { schemaGuard } from "../lib/schemaGuard";
import type {
  CareerViewModel,
  CourseViewModel,
  CycleViewModel,
} from "../types/domain";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";

export const careerService = {
  async getCareers(): Promise<CareerViewModel[]> {
    if (USE_MOCKS) {
      return careers;
    }

    const json = await apiClient.get<unknown>("/careers");
    return schemaGuard.parseCareerListResponse(json);
  },

  async getCareerById(careerId: string): Promise<CareerViewModel | null> {
    const allCareers = await this.getCareers();
    return allCareers.find((career) => career.id === careerId) ?? null;
  },

  async getCourseById(courseId: string): Promise<CourseViewModel | null> {
    const allCareers = await this.getCareers();

    return (
      allCareers
        .flatMap((career) => career.courses)
        .find((course) => course.id === courseId) ?? null
    );
  },

  async getCurriculumByCareerId(careerId: string): Promise<CycleViewModel[]> {
    const career = await this.getCareerById(careerId);

    if (!career) {
      return [];
    }

    const grouped = career.courses.reduce<Record<string, CourseViewModel[]>>(
      (acc, course) => {
        acc[course.cycle] = acc[course.cycle] ?? [];
        acc[course.cycle].push(course as CourseViewModel);
        return acc;
      },
      {},
    );

    return Object.entries(grouped).map(([cycle, courses]) => ({
      cycle,
      courses,
    }));
  },
};
