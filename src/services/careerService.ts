import { careers } from "../data/demo";
import { apiClient } from "../lib/apiClient";
import { endpoints } from "../lib/endpoints";
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

    const json = await apiClient.get<unknown>(endpoints.careers.list);
    return schemaGuard.parseCareerListResponse(json);
  },

  async getCareerById(careerId: string): Promise<CareerViewModel | null> {
    if (USE_MOCKS) {
      return careers.find((career) => career.id === careerId) ?? null;
    }

    const json = await apiClient.get<unknown>(
      endpoints.careers.detail(careerId),
    );

    return schemaGuard.parseCareerResponse(json);
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
    if (USE_MOCKS) {
      const career = careers.find((item) => item.id === careerId);

      if (!career) {
        return [];
      }

      const grouped = career.courses.reduce<Record<string, CourseViewModel[]>>(
        (acc, course) => {
          acc[course.cycle] = acc[course.cycle] ?? [];
          acc[course.cycle].push(course);
          return acc;
        },
        {},
      );

      return Object.entries(grouped).map(([cycle, courses]) => ({
        cycle,
        courses,
      }));
    }

    const json = await apiClient.get<unknown>(
      endpoints.careers.curriculum(careerId),
    );

    return schemaGuard.parseCurriculumResponse(json);
  },
};