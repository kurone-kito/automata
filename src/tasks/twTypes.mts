/**
 * Type definitions for TaskWarrior tasks.
 *
 * These types are based on the output of the `task export` command, which
 * returns a JSON array of tasks. Each task has a set of properties, some
 * of which are optional. The types defined here reflect the structure of
 * the task objects returned by TaskWarrior.
 */
export interface Task {
  /**
   * The annotations of the task.
   *
   * This is an array of annotation objects, each of which has an entry
   * date and a description.
   */
  readonly annotations?: readonly TaskAnnotation[];

  /**
   * The description of the task.
   *
   * This is a string that describes the task, and it is always present.
   */
  readonly description: string;

  /**
   * The dependencies of the task.
   *
   * This is an array of task IDs that this task depends on. A task cannot
   * be started until all of its dependencies are completed.
   */
  readonly depends?: readonly string[];

  /**
   * The due date of the task, in ISO 8601 format.
   *
   * This is optional, and it may not be present for all tasks.
   */
  readonly due?: string;

  /**
   * The end date of the task, in ISO 8601 format.
   *
   * This is optional, and it may not be present for all tasks. It is only
   * present for completed tasks, and it indicates when the task was
   * completed.
   */
  readonly end?: string;

  /**
   * The entry date of the task, in ISO 8601 format.
   *
   * This is the date when the task was created, and it is always present.
   */
  readonly entry: string;

  /**
   * The ID of the task.
   *
   * This is a unique identifier for the task, and it is always present.
   */
  readonly id: number;

  /**
   * The imask and mask properties of the task.
   *
   * These are used for filtering tasks, and they are optional. The imask
   * property is a numeric representation of the task's status, while the
   * mask property is a string representation of the task's status.
   */
  readonly imask?: number;

  /**
   * The mask property of the task, which is a string representation of the
   * task's status.
   *
   * This is optional, and it may not be present for all tasks. It is used
   * for filtering tasks based on their status.
   */
  readonly mask?: string;

  /**
   * The modified date of the task, in ISO 8601 format.
   *
   * This is the date when the task was last modified, and it is always
   * present.
   */
  readonly modified: string;

  /**
   * The parent task ID, if this task is a subtask of another task.
   *
   * This is optional, and it may not be present for all tasks. If it is
   * present, it indicates that this task is a subtask of the task with the
   * given ID.
   */
  readonly parent?: string;

  /**
   * The priority of the task.
   *
   * This is optional, and it may not be present for all tasks. It can be
   * one of the following values:
   * - `H`: High priority
   * - `M`: Medium priority
   * - `L`: Low priority
   */
  readonly priority?: TaskPriority;

  /**
   * The project of the task.
   *
   * This is optional, and it may not be present for all tasks. It is used
   * to group related tasks together under a common project name.
   */
  readonly project?: string;

  /**
   * The recurrence pattern of the task, in ISO 8601 format.
   *
   * This is optional, and it may not be present for all tasks. It
   * indicates how often the task recurs, if it is a recurring task.
   */
  readonly recur?: string;

  /**
   * The scheduled date of the task, in ISO 8601 format.
   *
   * This is optional, and it may not be present for all tasks. It
   * indicates when the task is scheduled to start, if it has a scheduled
   * date.
   */
  readonly scheduled?: string;

  /**
   * The start date of the task, in ISO 8601 format.
   *
   * This is optional, and it may not be present for all tasks. It
   * indicates when the task was started, if it has been started.
   */
  readonly start?: string;

  /**
   * The status of the task.
   *
   * This is always present, and it can be one of the following values:
   * - `completed`: The task is completed.
   * - `deleted`: The task is deleted.
   * - `pending`: The task is pending.
   * - `recurring`: The task is recurring.
   * - `waiting`: The task is waiting.
   */
  readonly status: TaskStatus;

  /**
   * The tags of the task.
   *
   * This is an array of strings, each of which is a tag associated with
   * the task. Tags are used to categorize tasks and make them easier to
   * find. This property is optional, and it may not be present for all
   * tasks.
   */
  readonly tags?: readonly string[];

  /**
   * The until date of the task, in ISO 8601 format.
   *
   * This is optional, and it may not be present for all tasks. It
   * indicates the date until which the task is relevant, if it has an
   * until date.
   */
  readonly until?: string;

  /**
   * The urgency of the task.
   *
   * This is a numeric value that indicates how urgent the task is. Higher
   * values indicate higher urgency. This property is always present, and
   * it is calculated by TaskWarrior based on various factors such as due
   * date, priority, and tags.
   */
  readonly urgency: number;

  /**
   * The UUID of the task.
   *
   * This is a unique identifier for the task, and it is always present. It
   * is used internally by TaskWarrior to identify tasks, and it is not the
   * same as the ID property, which is a numeric identifier that can change
   * when tasks are modified.
   */
  readonly uuid: string;

  /**
   * The wait date of the task, in ISO 8601 format.
   *
   * This is optional, and it may not be present for all tasks. It
   * indicates when the task is waiting to start, if it has a wait date.
   */
  readonly wait?: string;
}

/**
 * Type definition for task annotations.
 *
 * An annotation is a note attached to a task, and it has an entry date and
 * a description.
 */
export interface TaskAnnotation {
  /**
   * The entry date of the annotation, in ISO 8601 format.
   *
   * This is the date when the annotation was created, and it is always
   * present.
   */
  readonly entry: string;

  /**
   * The description of the annotation.
   *
   * This is a string that describes the annotation, and it is always
   * present.
   */
  readonly description: string;
}

/**
 * Type definitions for task priority.
 *
 * - `H`: High priority
 * - `M`: Medium priority
 * - `L`: Low priority
 */
export type TaskPriority = 'H' | 'L' | 'M';

/**
 * Type definitions for task status.
 *
 * - `completed`: The task is completed.
 * - `deleted`: The task is deleted.
 * - `pending`: The task is pending.
 * - `recurring`: The task is recurring.
 * - `waiting`: The task is waiting.
 */
export type TaskStatus =
  | 'completed'
  | 'deleted'
  | 'pending'
  | 'recurring'
  | 'waiting';
