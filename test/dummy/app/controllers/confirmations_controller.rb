class ConfirmationsController < ApplicationController
  include CableReady::Broadcaster

  def index
  end

  def new
    @confirmation = Confirmation.new
    render operations: cable_car
      .update_modal(
        html: self.class.render(
          template: "confirmations/new",
          assigns: {confirmation: @confirmation},
          layout: "cable_modal/bootstrap",
        ))
      .open_modal
  end

  def create
    @confirmation = Confirmation.new(confirmation_params)
    if @confirmation.valid?
      if params[:commit] == "Submit And Close"
        render operations: cable_car.close_modal
      else
        render operations: cable_car.redirect_to(url: confirmations_path)
      end
    else
      render operations: cable_car.update_modal(
        html: self.class.render(
          template: "confirmations/new",
          assigns: {confirmation: @confirmation},
          layout: "cable_modal/bootstrap",
        ))
    end
  end

  private

  def confirmation_params
    params.require(:confirmation).permit(:tos)
  end
end
