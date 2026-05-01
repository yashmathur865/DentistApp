/**
 * Base Repository — Generic data access layer.
 * 
 * Design Decision: This implements the Repository Pattern with a generic base class.
 * All entity-specific repositories extend this, inheriting CRUD operations.
 * This follows the Open/Closed Principle — new entities get repository support
 * by extending this class without modifying it.
 * 
 * The Dependency Inversion Principle is upheld because services depend on
 * repository abstractions (this base class interface) rather than direct
 * Mongoose model calls.
 */
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(filter = {}, options = {}) {
    const { sort = { createdAt: -1 }, populate = '', select = '' } = options;
    return this.model.find(filter).sort(sort).populate(populate).select(select);
  }

  async findById(id, options = {}) {
    const { populate = '', select = '' } = options;
    return this.model.findById(id).populate(populate).select(select);
  }

  async findOne(filter, options = {}) {
    const { populate = '', select = '' } = options;
    return this.model.findOne(filter).populate(populate).select(select);
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }

  async count(filter = {}) {
    return this.model.countDocuments(filter);
  }

  /**
   * Paginated query with total count.
   * Returns { docs, total, page, pages } for consistent pagination.
   */
  async paginate(filter = {}, options = {}) {
    const {
      page = 1,
      limit = 20,
      sort = { createdAt: -1 },
      populate = '',
    } = options;

    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      this.model
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .populate(populate),
      this.model.countDocuments(filter),
    ]);

    return {
      docs,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    };
  }
}

module.exports = BaseRepository;
