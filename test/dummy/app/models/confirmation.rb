class Confirmation
  include ActiveModel::Model
  include ActiveModel::Attributes

  attribute :tos, :boolean
  validates :tos, acceptance: true
end
