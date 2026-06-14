import { careers } from "../data/demo";
import { apiClient } from "../lib/apiClient";
import { endpoints } from "../lib/endpoints";
import { schemaGuard } from "../lib/schemaGuard";
import type {
  CareerViewModel,
  CourseViewModel,
  CycleViewModel,
} from "../types/domain";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

export const careerService = {
  async getCareers(): Promise<CareerViewModel[]> {
    if (USE_MOCKS) {
      return careers;
    }

    const json = await apiClient.get<unknown>(endpoints.careers.list);
    const items = schemaGuard.parseCareerListResponse(json);

    return Promise.all(
      items.map(async (career) => {
        try {
          return await this.getCareerById(career.id);
        } catch {
          return career;
        }
      }),
    ).then((items) =>
      items.filter((career): career is CareerViewModel => Boolean(career)),
    );
  },

  async getCareerById(careerId: string): Promise<CareerViewModel | null> {
    if (USE_MOCKS) {
      return careers.find((career) => career.id === careerId) ?? null;
    }

    const json = await apiClient.get<unknown>(
      endpoints.careers.detail(careerId),
    );

    const career = schemaGuard.parseCareerResponse(json);

    try {
      const curriculum = await this.getCurriculumByCareerId(careerId);
      return {
        ...career,
        courses: curriculum.flatMap((cycle) => cycle.courses),
      };
    } catch {
      return career;
    }
  },

  async getCourseById(courseId: string): Promise<CourseViewModel | null> {
    if (USE_MOCKS) {
      const allCareers = await this.getCareers();

      return (
        allCareers
          .flatMap((career) => career.courses)
          .find((course) => course.id === courseId) ?? null
      );
    }

    const allCareers = await this.getCareers();

    for (const career of allCareers) {
      const course = career.courses.find(
        (item) => item.id === courseId || item.syllabusId === courseId,
      );

      if (course) {
        return course;
      }
    }

    return null;
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
