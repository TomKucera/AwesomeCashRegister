export default interface ITableRepository<TModel, TKey> {
    /// <summary>
    /// Returns entity by its ID.
    /// </summary>
    /// <exception cref="Exceptions.EntityNotFoundException"></exception>
    GetById(id: TKey): Promise<TModel>;

    /// <summary>
    /// Creates entity.
    /// </summary>
    /// <param name="entity">Entity to create</param>
    Create(data: TModel): Promise<TModel>;

    /// <summary>
    /// Updates entity.
    /// </summary>
    /// <param name="entity">Entity to update.</param>
    Update(data: TModel): Promise<TModel>;

    /// <summary>
    /// Deletes entity.
    /// </summary>
    Delete(id: TKey): Promise<void>;

    /// <summary>
    /// Returns list data
    /// </summary>
    /// <returns>List data</returns>
    GetList(): Promise<TModel[]>;
}
